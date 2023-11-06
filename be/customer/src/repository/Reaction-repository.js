const Reaction = require("./../models/Reaction");

class PostRepository {
  async reactPost(reactinput) {
    const { PostId, UserId } = reactinput;
    await Reaction.create({
      userId: UserId,
      postId: PostId,
    });
  }
  //xoa react
  async delReact(postinput) {
    const { PostId, UserId } = postinput;
    await Reaction.destroy({
      where: { postId: PostId, userId: UserId },
    });
  }
}

module.exports = PostRepository;
