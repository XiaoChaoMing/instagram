const CustomerService = require("./../services/customer-service");
module.exports = (app) => {
  const services = new CustomerService();
  app.post("/register", async (req, res) => {
    const { userName, Password } = req.body;
    await services.CreateAccount({ userName, Password });
    await services.checkAccountId();
    res.json({
      status: 200,
    });
  });
  app.post("/login", async (req, res, next) => {});
  app.post("/updateProfile", async (req, res, next) => {});
  app.get("/profile", async (req, res, next) => {});
  app.post("/follow", async (req, res, next) => {});
  app.delete("/delUser", async (req, res, next) => {});
};
