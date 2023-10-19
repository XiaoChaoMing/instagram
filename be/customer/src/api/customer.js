const CustomerService = require("./../services/customer-service");
const express = require("express");
const router = express.Router();
const UserAuth = require("./middleware/auth");
module.exports = (app) => {
  const services = new CustomerService();
  app.use("/register", router);
  app.post("/register", async (req, res) => {
    const { userName, Password } = req.body;
    await services.CreateAccount({ userName, Password });

    res.json({
      status: 200,
    });
    // lam dang nhap truoc
    // res.redirect("/register/updateProfile");
  });

  app.post("/login", async (req, res, next) => {
    const { userName, Password } = req.body;
    await services.SignIn({ userName, Password });
    res.json({ status: 200 });
  });
  router.get("/updateProfile", async (req, res) => {
    res.json({ status: 201 });
  });
  app.get("/profile", UserAuth, async (req, res, next) => {
    res.json({ status: 200 });
  });
  app.post("/follow", async (req, res, next) => {});
  app.delete("/delUser", async (req, res, next) => {});
};
