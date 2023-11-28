const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./../bd-connection");
const User = require("./../models/User");
const Account = sequelize.define(
  "Accounts",
  {
    userName: {
      type: DataTypes.STRING,
    },
    Password: {
      type: DataTypes.STRING,
    },
    Salt: {
      type: DataTypes.STRING,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
    },
    RefreshTokken: { type: DataTypes.STRING },
  },
  { timestamps: true }
);

module.exports = Account;
