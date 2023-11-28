const Follower = require("./../models/Follower");
const { QueryTypes } = require("sequelize");
const sequelize = require("../bd-connection");
const { FormateData } = require("./../utils/index");
class FollowerRepository {
  async folowing(userinput) {
    const { followerId, followingId } = userinput;
    const existFollowers = await this.checkExistFollow({
      followerId,
      followingId,
    });
    if (!existFollowers) {
      await Follower.create({
        folowerId: followerId,
        followingId: followingId,
      });
      return FormateData({ existFollowers });
    }
  }
  async unFolowing(userinput) {
    const { followerId, followingId } = userinput;
    await Follower.destroy({
      where: {
        folowerId: followerId,
        followingId: followingId,
      },
    });
  }
  async getFollower(UserId) {
    const result = await Follower.count({
      where: {
        folowerId: UserId,
      },
      group: ["folowerId", "followingId"],
    });
    return FormateData({ result });
  }
  async getFollowing(id) {
    const result = await Follower.count({
      where: {
        followingId: id,
      },
      group: ["folowerId", "followingId"],
    });
    return result;
  }
  async getFriendList(id) {
    const friendLists = await sequelize.query(
      `GetUserFriendLists @UserId = ${id}`
    );
    return FormateData({ friendLists });
  }
  async getHighestFollowing(id) {
    const fl = await sequelize.query(`GetMostFollowersest @userId = ${id}`);
    return FormateData({ fl });
  }
  async checkExistFollow(userinput) {
    const { followerId, followingId } = userinput;
    const existFollow = await Follower.findAll({
      where: {
        folowerId: followerId,
        followingId: followingId,
      },
    });
    return existFollow.length > 0 ? true : false;
  }
}

module.exports = FollowerRepository;
