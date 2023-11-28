const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "instagram_ms",
  "sa",
  "1",
  {
    host: "localhost",
    dialect: "mssql",
    logging: false,
  },
  { timestamps: true }
);

const Connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Kết nối thành công.");
  } catch (error) {
    console.error("Không thể kết nối tới database", error);
  }
};
module.exports = sequelize;
Connect();
