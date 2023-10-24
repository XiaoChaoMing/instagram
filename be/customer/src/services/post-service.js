const PostRepository = require("./../repository/Post-repository");
class PostService {
  constructor() {
    this.repository = new PostRepository();
  }
  async CreatePost(postInfo) {
    const { UserId, status, Types, mediaFiles } = postInfo;
    await this.repository.CreatePost({ UserId, status, Types, mediaFiles });
  }
  async ReactPost(postInput) {
    const { PostId, UserId, comment } = postInput;
    await this.repository.reactPost({ PostId, UserId, comment });
  }
}
module.exports = PostService;
