const Follower = require("./../models/Follower");
const {
  HashPassword,
  GenerateSalt,
  ValidatePassword,
  GenerateSignature,
  FormateData,
} = require("./../utils/index");
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
  async getFollower(id) {
    const result = await Follower.count({
      where: {
        folowerId: id,
      },
      group: ["folowerId", "followingId"],
    });
    return result;
  }
  async getFollowing() {
    const result = await Follower.count({
      where: {
        followingId: id,
      },
      group: ["folowerId", "followingId"],
    });
    return result;
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
