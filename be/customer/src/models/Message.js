const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./../bd-connection");
const User = require("./../models/User");
const Notify = require("./../models/Notify");
const Message = sequelize.define(
  "Message",
  {
    messageText: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    hasTrigger: true,
    hooks: {
      afterCreate: (message, options) => {
        Notify.create({
          notifyTypeId: 8,
          fromUserId: message.fromUserId,
          userId: message.toUserId,
        });
      },
    },
  }
);

module.exports = Message;
