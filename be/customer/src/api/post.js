const { request } = require("express");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const PostService = require("./../services/post-service");
const UserAuth = require("./middleware/auth.js");
module.exports = (app, io, storage) => {
  this.postService = new PostService();

  app.post("/createPost", async (req, res, next) => {
    const { UserId, status, Types, mediaFiles } = req.body;
    setTimeout(async () => {
      const mediaFST = await Promise.all(
        mediaFiles.map(async (file) => {
          const imageRef = ref(storage, `img/${file}`);
          try {
            const url = await getDownloadURL(imageRef);
            return url;
          } catch (error) {
            console.log(error);
          }
        })
      );

      await this.postService.CreatePost({ UserId, status, Types, mediaFST });
      io.emit("newPost", () => {});
      res.json({
        status: 200,
        msg: "create success",
      });
    }, 3000);
  });

  app.post("/reactPost", async (req, res, next) => {
    const { PostId, UserId } = req.body;
    await this.postService.ReactPost({ PostId, UserId });
    res.json({
      status: 200,
      msg: "create success",
    });
  });
  app.post("/commentPost", async (req, res, next) => {
    const { userId, postId, commentText } = req.body;
    await this.postService.Comment({ userId, postId, commentText });
    res.json({
      status: 200,
      msg: "create success",
    });
  });
  app.get("/getPost", async (req, res, next) => {
    const data = await this.postService.getAllPost();
    res.json({ status: 200, msg: "get post success", data: data });
  });
};
