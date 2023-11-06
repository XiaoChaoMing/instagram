const Notify = require("./../models/Notify");
const {
  HashPassword,
  GenerateSalt,
  ValidatePassword,
  GenerateSignature,
  FormateData,
} = require("./../utils/index");
class FollowerRepository {
  async createNotify(notify) {
    const { notifyTypeId, userId } = notify;
    await Notify.create({
      notifyTypeId: notifyTypeId,
      userId: userId,
    });
  }
  async delNotify(id) {
    await Notify.destroy({
      where: { id: id },
    });
  }
}

module.exports = FollowerRepository;
