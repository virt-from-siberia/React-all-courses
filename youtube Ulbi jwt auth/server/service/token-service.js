const { getRepository } = require("typeorm");
const jwt = require("jsonwebtoken");
const tokenModel = require("../models/token-model");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "30s",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenRepository = getRepository(tokenModel);

    const tokenData = await tokenRepository.findOneBy({ user: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenRepository.save(tokenData);
    }

    const token = tokenRepository.create({ userId, refreshToken });
    await tokenRepository.save(token);
    return token;
  }

  async removeToken(refreshToken) {
    const tokenRepository = getRepository(tokenModel);
    const tokenData = await tokenRepository.delete({ refreshToken });
    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenRepository = getRepository(tokenModel);
    const tokenData = await tokenRepository.findOneBy({ refreshToken });
    return tokenData;
  }
}

module.exports = new TokenService();
