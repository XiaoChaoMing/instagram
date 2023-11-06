const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./../bd-connection");

const UserProfile = sequelize.define(
  "UserProfiles",
  {
    Country: {
      type: DataTypes.STRING,
    },
    phoneNUm: {
      type: DataTypes.STRING,
    },
    Email: {
      type: DataTypes.STRING,
    },
    nickName: {
      type: DataTypes.STRING,
    },
    Description: { type: DataTypes.STRING },
  },
  { timestamps: true }
);

module.exports = UserProfile;
