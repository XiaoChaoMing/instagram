const Comment = require("./../models/Comment");
const {
  HashPassword,
  GenerateSalt,
  ValidatePassword,
  GenerateSignature,
  FormateData,
} = require("./../utils/index");
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
  async getAllCommentByPostId(id) {
    await Comment.findAll({
      where: {
        postId: id,
      },
    });
  }
}

module.exports = CommentRepository;
