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
  async getBanList() {
    const banList = await sequelize.query("EXEC GetBanList");
    return FormateData({ banList });
  }
  async updateUser(userInput) {
    const { firstName, lastName, Avatarurl, birthDay, sexual, userId } =
      userInput;
    await User.update(
      {
        firstName: firstName,
        lastName: lastName,
        Avatar: Avatarurl,
        birthDay: birthDay,
        Sexual: sexual,
      },
      { where: { id: userId } }
    );
  }
  async getUserbyId(id) {
    const user = await User.findAll({
      where: {
        id: id,
      },
    });
    return user[0];
  }
  async getUserProfile(id) {
    const data = await sequelize.query(`EXEC GetUserProfile @UserId = ${id}`);
    return data[0];
  }
  async searchUser(info) {
    const { keyword, pageNumber } = info;
    const data = await sequelize.query(
      `EXEC SearchUsers @keyword = ${keyword},@pageSize = 5,@pageNumber = ${pageNumber}`
    );
    return FormateData({ data });
  }
  async getAllUsers() {
    const data = await sequelize.query(`EXEC GetAllUserProfile`);
    return data;
  }
}

module.exports = BanListRepository;
