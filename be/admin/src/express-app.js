const express = require("express");
const cors = require("cors");
const path = require("path");

module.exports = async (app) => {
  app.use(express.json());
  app.use(cors());
  app.use(express.static(path.join(__dirname, "./../../../fe/")));
  app.get("/admin", (req, res) => {
    res.sendFile("admin.html", {
      root: __dirname + "./../../../fe/",
    });
  });
};
