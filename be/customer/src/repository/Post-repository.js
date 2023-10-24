const Post = require("./../models/Post");
const PostMedia = require("./../models/PostMedia");
const Reaction = require("./../models/Reaction");
const Comment = require("./../models/Comment");
class PostRepository {
  async CreatePost({ postinput }) {
    const { UserId, status, Types, mediaFiles } = postinput;
    await Post.create({
      UserId: UserId,
      status: status,
      Types: Types,
    });
    await PostMedia.create({
      PostId: await this.getPostid(),
      mediaFiles: mediaFiles,
    });
  }
  async updatePost({ postinput }) {
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
  async reactPost({ postinput }) {
    const { PostId, UserId, comment } = postinput;
    await Reaction.create({
      UserId: UserId,
      PostId: PostId,
    });
    if (PostId && UserId && comment) {
      await Comment.create({
        UserId: UserId,
        PostId: PostId,
        comment: comment,
      });
    }
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
