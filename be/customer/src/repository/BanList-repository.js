const User = require("./../models/User");
const BanList = require("./../models/BanList");
const { QueryTypes } = require("sequelize");
const {
  HashPassword,
  GenerateSalt,
  ValidatePassword,
  GenerateSignature,
  FormateData,
} = require("./../utils/index");
const sequelize = require("../bd-connection");
class BanListRepository {
  async BanUser(accountId) {
    await BanList.create({
      accountId: accountId,
    });
  }
  async UnBanUser(accountId) {
    await BanList.destroy({
      where: { accountId: accountId },
    });
  }
  async getBanUserByid(accountId) {
    const BanUser = await BanList.findAll({
      where: {
        accountId: accountId,
      },
    });
    return BanUser.length > 0 ? true : false;
  }
}

module.exports = BanListRepository;
