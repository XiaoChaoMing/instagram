const express = require("express");
const cors = require("cors");
const path = require("path");
const { customer, posts } = require("./api");
module.exports = async (app, socketUser) => {
  app.use(express.json());
  app.use(cors());
  app.use(express.static(path.join(__dirname, "./../../../fe/adminPage")));
  app.get("/admin", (req, res) => {
    res.sendFile("admin.html", {
      root: __dirname + "./../../../fe/adminPage",
    });
  });

  customer(app, socketUser);
  posts(app);
};
