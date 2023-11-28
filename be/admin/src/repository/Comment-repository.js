const Comment = require("./../models/Comment");
const { QueryTypes } = require("sequelize");
const sequelize = require("../bd-connection");
const { FormateData } = require("./../utils/index");
class CommentRepository {
  async createComment(commentInput) {
    const { userId, postId, commentText } = commentInput;
    await Comment.create({
      userId: userId,
      postId: postId,
      commentText: commentText,
    });
  }
  async updateComment(commentInput) {
    const { userId, postId, commentText } = commentInput;
    await Comment.update(
      {
        userId: userId,
        postId: postId,
        commentText: commentText,
      },
      {
        where: {
          userId: userId,
          postId: postId,
        },
      }
    );
  }
  async deleteComment(id) {
    await Comment.destroy({ where: { id: id } });
  }
  async getCommentByPostId(id) {
    const comment = await sequelize.query(
      `EXEC GetCommmentByPostId @PostId = ${id}`
    );
    return FormateData({ comment });
  }
}

module.exports = CommentRepository;
