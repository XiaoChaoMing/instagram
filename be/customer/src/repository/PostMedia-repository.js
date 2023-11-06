const Post = require("./../models/Post");
const PostMedia = require("./../models/PostMedia");
const Reaction = require("./../models/Reaction");
const Comment = require("./../models/Comment");
class PostMediaRepository {
  // tao bai viet
  async CreatePostMedia(postinput) {
    const { postid, file } = postinput;
    await PostMedia.create({
      PostId: postid,
      mediaFile: file,
    });
  }
}

module.exports = PostMediaRepository;
