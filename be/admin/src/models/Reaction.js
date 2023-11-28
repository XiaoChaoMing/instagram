const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./../bd-connection");
const User = require("./../models/User");
const Post = require("./../models/Post");
const Notify = require("./../models/Notify");
const Reaction = sequelize.define(
  "Reaction",
  {},
  {
    timestamps: true,
    hasTrigger: true,
    hooks: {
      afterCreate: async (reaction, options) => {
        const post = await Post.findAll({
          where: {
            id: reaction.postId,
          },
        });
        if (post[0].userId !== reaction.userId) {
          await Notify.create({
            notifyTypeId: 4,
            fromUserId: reaction.userId,
            userId: post[0].userId,
          });
        }
      },
    },
  }
);

module.exports = Reaction;
