const { getRepository } = require("typeorm");
const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
// const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");

class UserService {
  async registration(email, password) {
    console.log("Получение репозитория...");
    const userRepository = getRepository(UserModel);

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4(); // v34fa-asfasf-142saf-sa-asf
    const userActivationLink = `${process.env.API_URL}/api/activate/${activationLink}`;

    const user = userRepository.create({
      email,
      password: hashPassword,
      activationLink,
    });

    await userRepository.save(user);
    // await mailService.sendActivationMail(email, activationLink);

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
      userActivationLink,
    };
  }

  async activate(activationLink) {
    const userRepository = getRepository(UserModel);
    const user = await userRepository.findOneBy({ activationLink });
    if (!user) {
      throw ApiError.BadRequest("Неккоректная ссылка активации");
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const userRepository = getRepository(UserModel);

    const user = await userRepository.findOneBy({ email });

    if (!user)
      throw ApiError.BadRequest("Пользователь с таким email не найден");

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) throw ApiError.BadRequest("Неверный пароль");

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) throw ApiError.UnauthorizedError();

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) throw ApiError.UnauthorizedError();

    const userRepository = getRepository(UserModel);
    const user = await userRepository.findOneBy({ id: userData.id });

    const userDto = new UserDto(user);

    const tokens = tokenService.generateTokens({ ...userDto });

    return {
      ...tokens,
      user: userDto,
    };
  }

  async getAllUsers() {
    const userRepository = getRepository(UserModel);
    const users = await userRepository.find();
    return users;
  }
}

module.exports = new UserService();
