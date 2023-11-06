const Message = require("./../models/Message");
const {
  HashPassword,
  GenerateSalt,
  ValidatePassword,
  GenerateSignature,
  FormateData,
} = require("./../utils/index");
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
    await Message.findAll({
      where: {
        fromUserId: fromUserId,
        toUserId: toUserId,
      },
    });
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
