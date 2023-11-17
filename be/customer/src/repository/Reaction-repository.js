const Reaction = require("./../models/Reaction");
const { FormateData } = require("./../utils/index");
class ReactionRepository {
  async reactPost(reactinput) {
    const { PostId, UserId } = reactinput;
    const exitsReact = await this.checkReactExits(reactinput);
    if (!exitsReact) {
      await Reaction.create({
        userId: UserId,
        postId: PostId,
      });
      return 1;
    } else {
      await this.delReact(reactinput);
      return 0;
    }
  }
  //xoa react

  async delReact(postinput) {
    const { PostId, UserId } = postinput;
    await Reaction.destroy({
      where: { postId: PostId, userId: UserId },
    });
  }
  async checkReactExits(reactinput) {
    const { PostId, UserId } = reactinput;
    const existReact = await Reaction.findAll({
      where: {
        userId: UserId,
        postId: PostId,
      },
    });
    return existReact.length > 0 ? true : false;
  }
}

module.exports = ReactionRepository;
