const Notify = require("./../models/Notify");
const { FormateData } = require("./../utils/index");
const { QueryTypes } = require("sequelize");
const sequelize = require("../bd-connection");
class NotifyRepository {
  async getNotify(UserId) {
    const Notifi = await await sequelize.query(
      `EXEC GetNotifications @UserId = ${UserId}`
    );
    return Notifi;
  }
  async delNotify(id) {
    await Notify.destroy({
      where: { id: id },
    });
  }
}

module.exports = NotifyRepository;
