const { getRepository } = require("typeorm");
const jwt = require("jsonwebtoken");
const tokenModel = require("../models/token-model");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId, refreshToken) {
    const tokenRepository = getRepository(tokenModel);

    const tokenData = await tokenRepository.findOne({ user: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenRepository.save(tokenData);
    }

    const token = tokenRepository.create({ userId, refreshToken });
    await tokenRepository.save(token);
    return token;
  }
}

module.exports = new TokenService();
