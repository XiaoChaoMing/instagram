const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./../bd-connection");
const User = require("./../models/User");
const Post = require("./../models/Post");
const Notify = require("./../models/Notify");
const Comment = sequelize.define(
  "Comment",
  {
    commentText: {
      type: DataTypes.STRING,
    },
  },
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
            notifyTypeId: 5,
            fromUserId: reaction.userId,
            userId: post[0].userId,
          });
        }
      },
    },
  }
);

module.exports = Comment;
