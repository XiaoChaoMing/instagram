const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { APP_SECRET } = require("./../config/config");
module.exports.HashPassword = async (password) => {
  return await bcrypt.hash(password);
};
module.exports.GenerateSignature = async (payload) => {
  try {
    return await jwt.sign(payload, APP_SECRET, { expiresIn: "15d" });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.ValidateSignature = async (req) => {
  try {
    const signature = req.get("Authorization");
    console.log(signature);
    const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
    req.user = payload;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
