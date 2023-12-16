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
