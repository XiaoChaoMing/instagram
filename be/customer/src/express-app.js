const express = require("express");
const cors = require("cors");
const { customer, post, notify, message } = require("./api");
const path = require("path");
module.exports = async (app, io, storage, users) => {
  app.use(express.json());
  app.use(cors());
  app.use(express.static(path.join(__dirname, "./../../../fe")));
  app.get("/", (req, res) => {
    res.sendFile(__dirname, "./../../../fe/index.html");
  });
  //api

  customer(app, io, storage, users);
  post(app, io, storage, users);
  notify(app, io);
  message(app, io, users);
};
