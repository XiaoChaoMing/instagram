const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const { PORT } = require("./config/config");
const expressApp = require("./express-app");
// const io = require("socket.io")(httpServer);

const corsOptions = {
  origin: ["http://127.0.0.1:8000"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));

expressApp(app);
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
