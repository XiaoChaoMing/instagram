const PostService = require("./../services/post-service");
module.exports = (app) => {
  const service = new PostService();
  app.post("/createPost", async (req, res, next) => {
    const { UserId, status, Types, mediaFiles } = req.body;
    await service.CreatePost({ UserId, status, Types, mediaFiles });
    res.json({
      status: 200,
      msg: "create success",
    });
  });
  app.post("/reactPost", async (req, res, next) => {
    const { PostId, UserId, comment } = req.body;
    await service.ReactPost({ PostId, UserId, comment });
    res.json({
      status: 200,
      msg: "create success",
    });
  });
};
