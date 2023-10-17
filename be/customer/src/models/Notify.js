const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./../bd-connection");
const User = require("./../models/User");
const Notify = sequelize.define(
  "Notify",
  {
    notifyTypeID: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: true }
);

module.exports = Notify;
