const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./../bd-connection");
const User = require("./../models/User");
const Notify = require("./Notify");
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
  {
    timestamps: true,
    hasTrigger: true,
    hooks: {
      afterCreate: async (follower, options) => {
        await Notify.create({
          notifyTypeId: 7,
          fromUserId: follower.followingId,
          userId: follower.folowerId,
        });
      },
    },
  }
);

module.exports = Follower;
