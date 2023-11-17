const { request } = require("express");
const NotifyService = require("./../services/notify-service");
const UserAuth = require("./middleware/auth.js");

module.exports = (app, io) => {
  this.NotifyService = new NotifyService();
  app.get("/notify/:id", async (req, res, next) => {
    const data = await this.NotifyService.getNotifications(req.params.id);
    res.json({ status: 200, msg: "get notify success", data: data });
  });
  app.post("/delNotify/:id", async (req, res, next) => {
    await this.NotifyService.delNotify(req.params.id);
    res.json({ status: 200, msg: "delete notify success" });
  });
};
