const User = require("./models/User");
const Account = require("./models/Account");
// const Album = require("./models/Album");
// const Comment = require("./models/Comment");
const Follower = require("./models/Follower");
// const Message = require("./models/Message");
// const Notify = require("./models/Notify");
// const NotifyType = require("./models/NotifyType");
// const Post = require("./models/Post");
// const PostMedia = require("./models/PostMedia");
// const PostType = require("./models/PostType");
// const Reaction = require("./models/Reaction");
const sequelize = require("./bd-connection");
const associate = () => {
  User.belongsTo(Account, {
    foreignKey: "AccountId",
    targetKey: "id",
  });
  Follower.belongsTo(User, {
    foreignKey: "folowerId",
    targetKey: "id",
  });
  Follower.belongsTo(User, {
    foreignKey: "followingId",
    targetKey: "id",
  });
  sequelize
    .sync()
    .then(() => {
      console.log("Đồng bộ thành công");
    })
    .catch((err) => {
      console.log(err);
    });
};
associate();
