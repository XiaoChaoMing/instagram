const Message = require("./../models/Message");
const { QueryTypes } = require("sequelize");
const sequelize = require("../bd-connection");
const { FormateData } = require("./../utils/index");

class MessageRepository {
  async createMessage(message) {
    const { fromUserId, toUserId, messageText } = message;
    await Message.create({
      fromUserId: fromUserId,
      toUserId: toUserId,
      messageText: messageText,
    });
  }
  async getMessage(fromUserId, toUserId) {
    const Message = await sequelize.query(
      `EXEC GetPrivateChat @friendId = ${toUserId},@userId = ${fromUserId}`
    );
    return FormateData({ Message });
  }
  async delMessage(fromUserId, toUserId) {
    await Message.destroy({
      where: {
        fromUserId: fromUserId,
        toUserId: toUserId,
      },
    });
  }
}

module.exports = MessageRepository;
