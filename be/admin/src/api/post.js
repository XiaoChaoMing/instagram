const { request } = require("express");

const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const PostService = require("./../services/post-service");
const NotifyService = require("./../services/notify-service");
const UserAuth = require("./middleware/auth.js");
module.exports = (app) => {
  this.postService = new PostService();
  this.NotifyService = new NotifyService();
  app.post("/createPost", UserAuth, async (req, res, next) => {
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
      const newPost = await this.postService.CreatePost({
        UserId,
        status,
        Types,
        mediaFST,
      });
      const userFollowing = await this.postService.Follower(UserId);

      userFollowing.data.result.forEach(async (follower) => {
        const getNotify = await this.NotifyService.getNotifications(
          follower.followingId
        );
        if (users[follower.followingId]) {
          io.to(users[follower.followingId]).emit("newNotify", {
            data: getNotify,
          });
        }
      });
      io.emit("newPost", { data: newPost });

      res.json({
        status: 200,
        msg: "create success",
      });
    }, 1000);
  });
  app.post("/reactPost", UserAuth, async (req, res, next) => {
    const { PostId, UserId, toUserId } = req.body;
    const exitsReact = await this.postService.ReactPost({ PostId, UserId });
    if (exitsReact === 1) {
      if (UserId !== toUserId) {
        const notify = await this.NotifyService.getNotifications(toUserId);
        io.to(users[toUserId]).emit("newNotify", {
          data: notify,
        });
        io.emit("newReact", { data: notify });
      }
      res.json({
        status: 200,
        msg: "create success",
      });
    } else {
      res.json({
        status: 201,
        msg: "delete success",
      });
    }
  });
  app.post("/updatePost", async (req, res, next) => {
    const data = req.body;
    const mediaFST = data.Media.map(async (mediaFile) => {
      if (mediaFile.type === 1) {
        const imageRef = ref(storage, `img/${mediaFile.name}`);
        try {
          const url = await getDownloadURL(imageRef);
          mediaFile.mediaFile = url;
          return mediaFile;
        } catch (error) {
          console.log(error);
        }
      } else {
        return mediaFile;
      }
    });
    Promise.all(mediaFST)
      .then(async (completed) => {
        data.Media = completed;
        await this.postService.UpdatePost(data);
        io.emit("updatePost", { data: "newpost" });
      })
      .catch((error) => {
        console.log(error);
      });

    res.json({ status: 200 });
  });
  app.post("/deletePost/:id", async (req, res, next) => {
    await this.postService.DeletePost(req.params.id);
    io.emit("updatePost", { data: "newpost" });
    res.json({ status: 200 });
  });
  app.post("/commentPost", UserAuth, async (req, res, next) => {
    const { userId, postId, commentText, toUserId } = req.body;
    await this.postService.Comment({ userId, postId, commentText });
    const notify = await this.NotifyService.getNotifications(toUserId);
    const cmt = await this.postService.GetCommentByPostId(postId);
    io.to(users[toUserId]).emit("newNotify", {
      data: notify,
    });
    io.emit("newComment", { data: cmt });
    res.json({
      status: 200,
      msg: "create success",
      data: notify,
    });
  });
  app.get("/getPost", async (req, res, next) => {
    const data = await this.postService.getAllPost();
    res.json({ status: 200, msg: "get post success", data: data });
  });
};
