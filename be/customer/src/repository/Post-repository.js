const Post = require("./../models/Post");
const PostMedia = require("./../models/PostMedia");
const Reaction = require("./../models/Reaction");
const Comment = require("./../models/Comment");
const { QueryTypes } = require("sequelize");
const sequelize = require("../bd-connection");
const {
  HashPassword,
  GenerateSalt,
  ValidatePassword,
  GenerateSignature,
  FormateData,
} = require("./../utils/index");
class PostRepository {
  async CreatePost(postinput) {
    const { UserId, status, Types } = postinput;
    await Post.create({
      userId: UserId,
      Status: status,
      postTypeId: Types,
    });
  }
  async updatePost(postinput) {
    const { PostId, UserId, status, Types, mediaFiles } = postinput;
    await Post.update(
      { UserId: UserId, status: status, Types: Types },
      { where: { id: PostId } }
    );
    await PostMedia.update(
      { mediaFiles: mediaFiles },
      { where: { PostId: PostId } }
    );
  }
  async delPost(id) {
    await Post.destroy({
      where: { id: id },
    });
  }
  async getPostAll() {
    const data = await sequelize.query(`EXEC GetAllPostByTime`);
    console.log(data);
    return FormateData(data);
  }
  async getPostbyUser(id) {
    const post = await Post.findAll({
      where: { userId: id },
    });
    return post[0];
  }
  async reactPost(postinput) {
    const { PostId, UserId, comment } = postinput;
    if (PostId && UserId && comment) {
      await Comment.create({
        userId: UserId,
        postId: PostId,
        commentText: comment,
      });
    } else {
      await Reaction.create({
        userId: UserId,
        postId: PostId,
      });
    }
  }
  async delReact(postinput) {
    const { PostId, UserId } = postinput;
    await Reaction.destroy({
      where: { postId: PostId, userId: UserId },
    });
  }
  async delComment(postinput) {
    const { PostId, UserId } = postinput;
    await Comment.destroy({
      where: { postId: PostId, userId: UserId },
    });
  }
  async getPostid() {
    const entries = await Post.findAll({
      limit: 1,
      order: [["createdAt", "DESC"]],
    });
    if (entries.length > 0) {
      const post = entries[0];
      return post.id;
    }
  }
}

module.exports = PostRepository;
