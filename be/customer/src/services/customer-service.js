const CustomerRepository = require("./../repository/Customer-repository");
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
  constructor() {
    this.repository = new CustomerRepository();
  }

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
  async Register(accountInfo) {
    const {
      userName,
      Password,
      firstName,
      lastName,
      Avatar,
      birthDay,
      phoneNum,
      Email,
    } = accountInfo;
    const salt = await GenerateSalt();
    const userPassword = await HashPassword(Password, salt);
    const unq = await this.repository.createAccount({
      userName,
      userPassword,
      salt,
      firstName,
      lastName,
      Avatar,
      birthDay,
      phoneNum,
      Email,
    });
    const token = await GenerateSignature({
      userName: userName,
    });
    return unq;
  }
  async CreatePost(postInfo) {}
}
module.exports = CustomerService;
