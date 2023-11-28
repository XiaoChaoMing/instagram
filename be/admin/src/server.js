const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const { PORT } = require("./config/config");
const expressApp = require("./express-app");
const io_Client = require("socket.io-client");
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

const corsOptions = {
  origin: ["http://127.0.0.1:8001", "http://127.0.0.1:8002"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
const socketUser = io_Client("http://127.0.0.1:8001");
require("./bd-connection");
require("./associate");
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
//conect to client admin
io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
// connect to socket user

socketUser.on("connect", () => {
  console.log("ket noi thanh cong");
});
socketUser.on("adminConnect", async (data) => {
  user = await data;
  console.log(user);
  io.emit("getUserOnline", { data: data });
});

expressApp(app, socketUser);
app.start = app.listen = function () {
  return httpServer.listen.apply(httpServer, arguments);
};
app.start(PORT);
