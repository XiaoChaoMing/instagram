const MessageService = require("./../services/message-service.js");
const NotifyService = require("./../services/notify-service");
const UserAuth = require("./middleware/auth.js");
module.exports = (app, io, users) => {
  this.MessageService = new MessageService();
  this.NotifyService = new NotifyService();
  app.get("/MessageItem/:id", async (req, res, next) => {
    const friendLists = await this.MessageService.getFriendsList(req.params.id);
    res.json({ status: 200, msg: "get post success", data: friendLists });
  });
  app.post("/SendMessage", async (req, res, next) => {
    const { fromUserId, toUserId, messageText } = req.body;
    await this.MessageService.sendMessage({
      fromUserId,
      toUserId,
      messageText,
    });
    const notify = await this.NotifyService.getNotifications(toUserId);
    const msg = await this.MessageService.getPrivateMessage(
      fromUserId,
      toUserId
    );
    io.to(users[toUserId]).emit("newNotify", {
      data: notify,
    });

    io.to(users[fromUserId]).emit("newMsg", {
      data: msg,
    });
    io.to(users[toUserId]).emit("newMsg", {
      data: msg,
    });
    res.json({ status: 200, msg: "sendMessage success" });
  });
  app.post("/getPrivateMs", async (req, res, next) => {
    const { fromUserId, toUserId } = req.body;
    const msg = await this.MessageService.getPrivateMessage(
      fromUserId,
      toUserId
    );
    res.json({ status: 200, msg: "get success", data: msg });
  });
};
