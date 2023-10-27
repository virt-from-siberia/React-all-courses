const userService = require("../service/user-service");

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body;

      // Проверка на наличие email и password
      if (!email || !password) {
        return res.status(400).json({
          error: "Необходимо предоставить адрес электронной почты и пароль.",
        });
      }

      const userData = await userService.registration(email, password);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
    } catch (error) {}
  }

  async refreshToken(req, res, next) {
    try {
    } catch (error) {}
  }

  async getUsers(req, res, next) {
    try {
      res.json(["123", "456"]);
    } catch (error) {}
  }
}

module.exports = new UserController();
