const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./../bd-connection");
const User = require("./../models/User");
const Follower = sequelize.define(
  "Follower",
  {
    folowerId: {
      type: DataTypes.INTEGER,
    },
    followingId: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: true }
);

module.exports = Follower;
