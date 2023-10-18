const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./../bd-connection");
const User = require("./../models/User");
const PostMedia = sequelize.define(
  "PostMedia",
  {
    mediaFile: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true }
);

module.exports = PostMedia;
