const CustomerService = require("./../services/customer-service");
const NotifyService = require("./../services/notify-service");
const express = require("express");
const router = express.Router();
const UserAuth = require("./middleware/auth");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
module.exports = (app, io, storage, user) => {
  this.customerService = new CustomerService();
  this.NotifyService = new NotifyService();
  app.use("/register", router);

  app.post("/register", async (req, res) => {
    const {
      userName,
      Password,
      firstName,
      lastName,
      Avatar,
      birthDay,
      sexual,
    } = req.body;
    const unq = await this.customerService.Register({
      userName,
      Password,
      firstName,
      lastName,
      Avatar,
      birthDay,
      sexual,
    });
    if (unq) {
      res.json({
        status: 200,
        msg: "tao thanh cong",
      });
    } else {
      res.json({
        status: 202,
        msg: "tao that bai",
      });
    }
  });
  app.post("/loginAdmin", async (req, res, next) => {
    const { userName, Password } = req.body;
    const existAccount = await this.customerService.SignIn({
      userName,
      Password,
    });
    if (existAccount) {
      return res.json({
        status: 200,
        msg: "dang nhap thanh cong",
        data: existAccount,
      });
    }
    return res.json({ status: 202, msg: "dang nhap that bai" });
  });
  app.post("/updateProfile", async (req, res, next) => {
    let Avatarurl;
    const {
      userId,
      firstName,
      lastName,
      Avatar,
      birthDay,
      sexual,
      Country,
      phoneNum,
      Email,
      nickName,
      Description,
    } = req.body;
    setTimeout(async () => {
      if (Avatar) {
        const imageRef = await ref(storage, `img/${Avatar}`);
        Avatarurl = await getDownloadURL(imageRef);
      }

      await this.customerService.updateUserProfile({
        userId,
        firstName,
        lastName,
        Avatarurl,
        birthDay,
        sexual,
        Country,
        phoneNum,
        Email,
        nickName,
        Description,
      });
      res.json({
        status: 200,
        msg: "create success",
      });
    }, 1000);
  });
  app.get("/profile/:id", async (req, res, next) => {
    const data = await this.customerService.getProfileUser(req.params.id);
    res.json({ status: 200, data: data });
  });
  app.post("/follow", async (req, res, next) => {
    const { followerId, followingId } = req.body;
    const existFollow = await this.customerService.Following({
      followerId,
      followingId,
    });
    const notify = await this.NotifyService.getNotifications(followerId);
    if (existFollow) {
      io.to(users[followerId]).emit("newNotify", { data: notify });
      return res.json({ status: 200, msg: "follow thanh cong" });
    }
    return res.json({ msg: "error" });
  });
  app.post("/unfollow", async (req, res, next) => {
    const { followerId, followingId } = req.body;
    await this.customerService.unFollowing({ followerId, followingId });
    res.json({ status: 200, msg: "unfollow" });
  });
  app.get("/highestFollowings/:id", async (req, res, next) => {
    const data = await this.customerService.getTopFollowers(req.params.id);
    res.json({ status: 200, data: data });
  });
  app.get("/follower/:id", async (req, res, next) => {
    const data = await this.customerService.Follower(req.params.id);
    res.json({ data: data });
  });
  app.post("/searchUser", async (req, res, next) => {
    const { keyword, pageNumber } = req.body;
    const data = await this.customerService.searchUser({ keyword, pageNumber });
    res.json({ status: 200, data: data });
  });
  app.get("/getAllUsers", async (req, res, next) => {
    const data = await this.customerService.getAllUsers();

    res.json({ status: 200, data: data, totalUser: await user });
  });
  app.get("/banUser/:id", async (req, res, next) => {
    await this.customerService.BanUser(req.params.id);
    io.emit("banSuccess", { data: 1 });
    res.json({ status: 200, msg: "ban user successfully" });
  });
  app.get("/unbanUser/:id", async (req, res, next) => {
    await this.customerService.unBanUser(req.params.id);
    io.emit("banSuccess", { data: 1 });
    res.json({ status: 200, msg: "unban user successfully" });
  });
  app.get("/getBanList", async (req, res, next) => {
    const data = await this.customerService.getBanList();
    res.json({ status: 200, data: data });
  });
  app.post("/adminPermissions", async (req, res, next) => {
    await this.customerService.adminPermissions(req.body);
    io.emit("PermissionSuccess", { data: 1 });
    res.json({ status: 200 });
  });
};
