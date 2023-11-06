const express = require("express");
const cors = require("cors");
const { customer, post } = require("./api");
const path = require("path");
module.exports = async (app, io, storage) => {
  app.use(express.json());
  app.use(cors());
  app.use(express.static(path.join(__dirname, "./../../../fe")));

  //api

  customer(app, io);
  post(app, io, storage);
};
