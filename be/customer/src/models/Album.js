const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./../bd-connection");
const User = require("./../models/User");
const Album = sequelize.define(
  "Album",
  {
    Userid: {
      type: DataTypes.INTEGER,
    },
    Postid: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: true }
);

module.exports = Album;
