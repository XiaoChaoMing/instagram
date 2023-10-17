const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./../bd-connection");
const Account = require("./Account");
const User = sequelize.define(
  "Users",
  {
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    nickName: {
      type: DataTypes.STRING,
    },
    Avatar: {
      type: DataTypes.STRING,
    },
    birthDay: {
      type: DataTypes.DATEONLY,
    },
    phoneNum: {
      type: DataTypes.STRING,
    },
    Email: {
      type: DataTypes.STRING,
    },
    AccountId: {
      type: DataTypes.INTEGER,
    },
    notifyId: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: true }
);

module.exports = User;
