const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ACCESS_TOKKEN_KEY, REFRESH_TOKKEN_KEY } = require("../config/config");
module.exports.GenerateSalt = async () => {
  return await bcrypt.genSalt();
};
module.exports.HashPassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

module.exports.ValidatePassword = async (
  enteredPassword,
  savedPassword,
  salt
) => {
  return (await this.HashPassword(enteredPassword, salt)) === savedPassword;
};
module.exports.GenerateAccessTokken = async (payload) => {
  try {
    return jwt.sign(payload, ACCESS_TOKKEN_KEY, { expiresIn: "30d" });
  } catch (error) {
    console.log(error);
    return error;
  }
};
module.exports.GenerateRefreshTokken = async (payload) => {
  try {
    return jwt.sign(payload, REFRESH_TOKKEN_KEY, { expiresIn: "30d" });
  } catch (error) {
    console.log(error);
    return error;
  }
};
module.exports.ValidateAccessToken = async (req) => {
  try {
    const signature = req.get("Authorization");
    // console.log(signature);
    const payload = await jwt.verify(
      signature.split(" ")[1],
      ACCESS_TOKKEN_KEY
    );
    req.user = payload;
    // console.log(payload);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
module.exports.ValidateRefreshToken = async (req) => {
  try {
    const signature = req.get("Authorization");
    console.log(signature);
    const payload = await jwt.verify(
      signature.split(" ")[1],
      REFRESH_TOKKEN_KEY
    );
    req.user = payload;
    console.log(payload);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
module.exports.FormateData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};
