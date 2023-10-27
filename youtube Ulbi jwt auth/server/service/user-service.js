const { getRepository } = require("typeorm");
const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");

class UserService {
  async registration(email, password) {
    const userRepository = getRepository(UserModel);

    const candidate = await userRepository.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4(); // v34fa-asfasf-142saf-sa-asf

    const user = userRepository.create({
      email,
      password: hashPassword,
      activationLink,
    });
    await userRepository.save(user);
    await mailService.sendActivationMail(email, activationLink);
  }
}

module.exports = new UserService();
