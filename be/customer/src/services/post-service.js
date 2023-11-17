const PostRepository = require("./../repository/Post-repository");
const PostMediaRepository = require("./../repository/PostMedia-repository");
const ReactionRepository = require("./../repository/Reaction-repository");
const CommentRepository = require("./../repository/Comment-repository");
const FolowRepository = require("./../repository/Follower-repository");
class PostService {
  constructor() {
    this.PostRepo = new PostRepository();
    this.PostMediaRepo = new PostMediaRepository();
    this.ReactRepo = new ReactionRepository();
    this.CommentRepo = new CommentRepository();
    this.FollowRepo = new FolowRepository();
  }
  async CreatePost(postInfo) {
    const { UserId, status, Types, mediaFST } = postInfo;
    await this.PostRepo.CreatePost({ UserId, status, Types });
    const postid = await this.PostRepo.getPostid();

    mediaFST.forEach(async (file) => {
      await this.PostMediaRepo.CreatePostMedia({ postid, file });
    });
    console.log(await this.PostRepo.getLastedPost());
    return await this.PostRepo.getLastedPost();
  }
  async getAllPost() {
    return await this.PostRepo.getPostAll();
  }
  async getPostById(id) {
    return await this.PostRepo.getPostbyid(id);
  }
  async DeletePost(postId) {
    await this.PostRepo.delPost(postId);
  }
  async ReactPost(postInput) {
    const { PostId, UserId } = postInput;
    return await this.ReactRepo.reactPost({ PostId, UserId });
  }
  async delReactPost(postInput) {
    const { PostId, UserId } = postInput;
    await this.ReactRepo.delReact({ PostId, UserId });
  }
  async Comment(commentinput) {
    const { userId, postId, commentText } = commentinput;
    await this.CommentRepo.createComment({ userId, postId, commentText });
  }
  async GetCommentByPostId(id) {
    return await this.CommentRepo.getCommentByPostId(id);
  }
  async delComment(id) {
    await this.CommentRepo.deleteComment(id);
  }
  async updateComment(commentinput) {
    const { userId, postId, commentText } = commentinput;
    await this.CommentRepo.updateComment({ userId, postId, commentText });
  }
  async getLatedPost() {
    return await this.PostRepo.getLastedPost();
  }
  async Follower(UserId) {
    return await this.FollowRepo.getFollower(UserId);
  }
  async showFullPost(id) {}
}
module.exports = PostService;
