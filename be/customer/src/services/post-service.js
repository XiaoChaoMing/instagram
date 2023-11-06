const PostRepository = require("./../repository/Post-repository");
const PostMediaRepository = require("./../repository/PostMedia-repository");
const ReactionRepository = require("./../repository/Reaction-repository");
const CommentRepository = require("./../repository/Comment-repository");
class PostService {
  constructor() {
    this.PostRepo = new PostRepository();
    this.PostMediaRepo = new PostMediaRepository();
    this.ReactRepo = new ReactionRepository();
    this.CommentRepo = new CommentRepository();
  }
  async CreatePost(postInfo) {
    const { UserId, status, Types, mediaFST } = postInfo;
    await this.PostRepo.CreatePost({ UserId, status, Types });
    const postid = await this.PostRepo.getPostid();

    mediaFST.forEach(async (file) => {
      await this.PostMediaRepo.CreatePostMedia({ postid, file });
    });
  }
  async getAllPost() {
    return await this.PostRepo.getPostAll();
  }
  async DeletePost(postId) {
    await this.PostRepo.delPost(postId);
  }
  async ReactPost(postInput) {
    const { PostId, UserId } = postInput;
    await this.ReactRepo.reactPost({ PostId, UserId });
  }
  async delReactPost(postInput) {
    const { PostId, UserId } = postInput;
    await this.ReactRepo.delReact({ PostId, UserId });
  }
  async Comment(commentinput) {
    const { userId, postId, commentText } = commentinput;
    await this.CommentRepo.createComment({ userId, postId, commentText });
  }
  async delComment(id) {
    await this.CommentRepo.deleteComment(id);
  }
  async updateComment(commentinput) {
    const { userId, postId, commentText } = commentinput;
    await this.CommentRepo.updateComment({ userId, postId, commentText });
  }
  async showFullPost(id) {}
}
module.exports = PostService;
