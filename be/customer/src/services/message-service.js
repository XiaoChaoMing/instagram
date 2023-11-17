const FolowRepository = require("./../repository/Follower-repository");
const MessageRepository = require("./../repository/Message-repository");

class MessageService {
  constructor() {
    this.FollowRepo = new FolowRepository();
    this.MessRepo = new MessageRepository();
  }
  async getFriendsList(id) {
    return await this.FollowRepo.getFriendList(id);
  }
  async sendMessage(message) {
    return await this.MessRepo.createMessage(message);
  }
  async getPrivateMessage(fromUserId, toUserId) {
    return await this.MessRepo.getMessage(fromUserId, toUserId);
  }
}
module.exports = MessageService;
