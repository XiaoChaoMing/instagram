const Post = require("./../models/Post");
const PostMedia = require("./../models/PostMedia");
const Reaction = require("./../models/Reaction");
const Comment = require("./../models/Comment");
const { QueryTypes } = require("sequelize");
const sequelize = require("../bd-connection");
const { FormateData } = require("./../utils/index");
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
    const { id, userId, Status, postTypeId, Media } = postinput;
    console.log({ id, userId, Status, postTypeId, Media });
    await Post.update(
      { UserId: userId, Status: Status, Types: postTypeId },
      { where: { id: id } }
    );
    Media.forEach(async (mediaItem) => {
      if (mediaItem.type === 1) {
        await PostMedia.create({
          mediaFile: mediaItem.mediaFile,
          PostId: id,
        });
      } else if (mediaItem.type === 0) {
        await PostMedia.destroy({
          where: { mediaFile: mediaItem.mediaFile, PostId: id },
        });
      }
    });
  }
  async delPost(id) {
    await Post.destroy({
      where: { id: id },
    });
  }
  async getPostAll() {
    const data = await sequelize.query(`EXEC GetAllPosts`);
    return FormateData(data);
  }
  async getPostbyUser(id) {
    const post = await Post.findAll({
      where: { userId: id },
    });
    return post[0];
  }
  async getPostbyid(id) {
    const post = await Post.findAll({
      where: { id: id },
    });
    return FormateData({ post });
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
  async getLastedPost() {
    const data = await sequelize.query(`EXEC GetLatestPost`);
    return FormateData(data);
  }
  async PostChartByYear() {
    const chart = await sequelize.query(`EXEC GetMonthlyPostCount`);
    return FormateData({ chart });
  }
  async getWeeklyPost(userId) {
    const chart = await sequelize.query(
      `EXEC GetUserWeeklyPostCount ${userId}`
    );
    return FormateData({ chart });
  }
}

module.exports = PostRepository;
