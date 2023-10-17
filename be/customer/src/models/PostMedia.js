const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./../bd-connection");
const User = require("./../models/User");
const PostMedia = sequelize.define(
  "PostMedia",
  {
    Postid: {
      type: DataTypes.INTEGER,
    },
    mediaFile: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true }
);

module.exports = PostMedia;