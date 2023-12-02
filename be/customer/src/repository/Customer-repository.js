const User = require("./../models/User");
const { QueryTypes } = require("sequelize");
const {
  HashPassword,
  GenerateSalt,
  ValidatePassword,
  GenerateSignature,
  FormateData,
} = require("./../utils/index");
const sequelize = require("../bd-connection");
class CustomerRepository {
  async createUser(userInput) {
    const { firstName, lastName, birthDay, sexual, accountId } = userInput;
    await User.create({
      firstName: firstName,
      lastName: lastName,
      Avatar:
        "https://firebasestorage.googleapis.com/v0/b/instagram-clone-5b21f.appspot.com/o/img%2F360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg?alt=media&token=2b7ecd60-d5bc-46d4-a050-0b78cf0ad0ff",
      birthDay: birthDay,
      Sexual: sexual,
      accountId: await accountId,
    });
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
  // async folowing(userinput) {
  //   const { followerId, followingId } = userinput;
  //   const existFollowers = await this.checkExistFollow({
  //     followerId,
  //     followingId,
  //   });
  //   if (!existFollowers) {
  //     await Follower.create({
  //       folowerId: followerId,
  //       followingId: followingId,
  //     });
  //     return FormateData({ existFollowers });
  //   }
  // }
  // async unFolowing(userinput) {
  //   const { followerId, followingId } = userinput;
  //   await Follower.destroy({
  //     where: {
  //       folowerId: followerId,
  //       followingId: followingId,
  //     },
  //   });
  // }
  // async Follower(id) {
  //   const result = await Follower.count({
  //     where: {
  //       folowerId: id,
  //     },
  //     group: ["folowerId", "followingId"],
  //   });
  //   return result;
  // }

  // async checkExistFollow(userinput) {
  //   const { followerId, followingId } = userinput;
  //   const existFollow = await Follower.findAll({
  //     where: {
  //       folowerId: followerId,
  //       followingId: followingId,
  //     },
  //   });
  //   return existFollow.length > 0 ? true : false;
  // }
  // async checkUniqueUserName(userName) {
  //   const existUser = await Account.findAll({
  //     where: {
  //       userName: userName,
  //     },
  //   });
  //   return existUser.length > 0 ? true : false;
  // }
}

module.exports = CustomerRepository;
