const CustomerService = require("./../services/customer-service");

const express = require("express");
const router = express.Router();
const UserAuth = require("./middleware/auth");
module.exports = (app, io) => {
  this.customerService = new CustomerService();
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
  app.post("/login", async (req, res, next) => {
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
    await this.customerService.updateUserProfile({
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
    });
    res.json({
      status: 200,
    });
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
    if (existFollow) {
      io.emit("followEvent", { data: { followerId, followingId } });
      return res.json({ msg: "follow thanh cong" });
    }
    return res.json({ msg: "error" });
  });
  app.post("/unfollow", async (req, res, next) => {
    const { followerId, followingId } = req.body;
    await this.customerService.unFollowing({ followerId, followingId });
    res.json({ status: 200, msg: "unfollow" });
  });
  app.get("/follower/:id", async (req, res, next) => {
    const data = await services.Follower(req.params.id);
    res.json({ data: data });
  });
};
