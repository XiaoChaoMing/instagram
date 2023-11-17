const NotifyRepository = require("./../repository/Notify-repository");
const CustomerRepository = require("./../repository/Customer-repository");
const { FormateData } = require("./../utils/index");
class NotiService {
  constructor() {
    this.NotiRepo = new NotifyRepository();
    this.CustomerRepo = new CustomerRepository();
  }
  async getNotifications(UserId) {
    const notify = await this.NotiRepo.getNotify(UserId);
    return FormateData({ notify });
  }
  async delNotify(id) {
    await this.NotiRepo.delNotify(id);
  }
}
module.exports = NotiService;
