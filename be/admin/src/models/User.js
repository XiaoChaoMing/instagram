const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./../bd-connection");
const UserProfile = require("./../models/UserProfile");
const User = sequelize.define(
  "Users",
  {
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    Avatar: {
      type: DataTypes.STRING,
    },
    birthDay: {
      type: DataTypes.DATEONLY,
    },
    Sexual: { type: DataTypes.BOOLEAN },
  },
  {
    timestamps: true,
    hasTrigger: true,
    hooks: {
      afterCreate: async (User, options) => {
        await UserProfile.create({
          userId: User.id,
        });
      },
    },
  }
);

module.exports = User;
