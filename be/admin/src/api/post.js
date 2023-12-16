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
  app.get("/getPost", async (req, res, next) => {
    const data = await this.postService.getAllPost();
    res.json({ status: 200, msg: "get post success", data: data });
  });
  app.get("/postChartByYear", async (req, res, next) => {
    const chart = await this.postService.postChartByYear();
    res.json({ status: 200, data: chart });
  });
  app.get("/getUserWeeklyPost/:id", async (req, res, next) => {
    const chart = await this.postService.getWeeklyPost(req.params.id);
    res.json({ status: 200, data: chart });
  });
};
