const Account = require("./../models/Account");
const User = require("./../models/User");
const {
  HashPassword,
  GenerateSalt,
  ValidatePassword,
  GenerateSignature,
  FormateData,
} = require("./../utils/index");
require("./../utils/index");
class CustomerService {
  async SignIn(userInput) {
    const { userName, Password } = userInput;
    const existAccount = await Account.findOne({
      where: {
        userName: userName,
      },
    });
    if (existAccount) {
      const validPassword = await ValidatePassword(
        Password,
        existAccount.Password,
        existAccount.Salt
      );

      if (validPassword) {
        const token = await GenerateSignature({
          userName: existAccount.userName,
        });
        console.log(token);
        return FormateData({ id: existAccount._id, token });
      }
    }
  }
  async CreateAccount(accountInfo) {
    const { userName, Password } = accountInfo;
    const salt = await GenerateSalt();
    const userPassword = await HashPassword(Password, salt);
    await Account.create({
      userName: userName,
      Password: userPassword,
      Salt: salt,
    });
    const token = await GenerateSignature({
      userName: userName,
    });
  }

  async checkAccountId(AccountId) {
    const existAccount = Account.findAll({
      where: {
        id: AccountId,
      },
    });
    return existAccount ? true : false;
  }

  async CreateUser(userInfo) {
    const { firtsName, lastName, nickName, Avatar, birthDay, phoneNum, Email } =
      userInfo;
  }
}
module.exports = CustomerService;
