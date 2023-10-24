const Post = require("./../models/Post");
const PostMedia = require("./../models/PostMedia");
const Reaction = require("./../models/Reaction");
const Comment = require("./../models/Comment");
class PostRepository {
  async CreatePost(postinput) {
    const { UserId, status, Types, mediaFiles } = postinput;
    await Post.create({
      userId: UserId,
      Status: status,
      postTypeId: Types,
    });
    await PostMedia.create({
      PostId: await this.getPostid(),
      mediaFile: mediaFiles,
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
  async reactPost(postinput) {
    console.log(postinput);
    const { PostId, UserId, comment } = postinput;
    console.log({ PostId, UserId, comment });
    await Reaction.create({
      userId: UserId,
      postId: PostId,
    });
    if (PostId && UserId && comment) {
      await Comment.create({
        userId: UserId,
        postId: PostId,
        commentText: comment,
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
