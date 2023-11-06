const Account = require("./../models/Account");
const { QueryTypes } = require("sequelize");
const {
  HashPassword,
  GenerateSalt,
  ValidatePassword,
  GenerateSignature,
  FormateData,
} = require("./../utils/index");
const sequelize = require("../bd-connection");
class AccountRepository {
  async createAccount(userInput) {
    const { userName, userPassword, salt } = userInput;
    const unq = await this.checkUniqueUserName(userName);
    if (!unq) {
      await Account.create({
        userName: userName,
        Password: userPassword,
        Salt: salt,
        isAdmin: 1,
      });
      return 1;
    } else {
      return 0;
    }
  }

  async updateAccount(userInput) {
    const { userName, password, salt, admin, refreshToken } = userInput;
    await Account.update(
      {
        Password: password,
        Salt: salt,
        isAdmin: admin,
        RefreshTokken: refreshToken,
      },
      { where: { userName: userName } }
    );
  }
  async deleteAccount(id) {
    await Account.destroy({ where: { id: id } });
  }
  async getAccountId() {
    const entries = await Account.findAll({
      limit: 1,
      order: [["createdAt", "DESC"]],
    });
    if (entries.length > 0) {
      const acc = entries[0];
      return acc.id;
    }
  }
  async getAccountByUserName(userName) {
    const acc = await sequelize.query(
      `EXEC GetUserAccountInfo @userName ='${userName}'`
    );
    return acc[0];
  }
  async checkUniqueUserName(userName) {
    const existUser = await Account.findAll({
      where: {
        userName: userName,
      },
    });
    return existUser.length > 0 ? true : false;
  }
}

module.exports = AccountRepository;
