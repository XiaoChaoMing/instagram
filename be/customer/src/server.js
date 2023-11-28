const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const { PORT } = require("./config/config");
const expressApp = require("./express-app");
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
const config = require("./config/firebase.config");
const { initializeApp, applicationDefault, cert } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const users = {};
initializeApp(config);
const storage = getStorage();
const corsOptions = {
  origin: ["http://127.0.0.1:8001", "http://127.0.0.1:8002"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
const UserAuth = require("./api/middleware/auth");
require("./bd-connection");
require("./associate");

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));

expressApp(app, io, storage, users);
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("user connected");
  console.log(userId);
  users[userId] = socket.id;
  expressApp(app, io, storage, users);
  io.emit("adminConnect", { data: users });
  socket.on("disconnect", () => {
    delete users[userId];
    console.log("user disconnected");
    io.emit("adminConnect", { data: users });
  });
  console.log(users);
  socket.on("sendFile", (data, callback) => {
    let imageBuffer;
    imageBuffer = Buffer.from(data.file.split(";base64,")[1], "base64");
    const mountainsRef = ref(storage, "img/" + data.name);
    const uploadTask = uploadBytes(mountainsRef, imageBuffer);
    uploadTask.catch((error) => {
      console.error("Error uploading file:", error);
    });
    console.log("File received and saved");
    callback({ status: "success" });
  });
});

app.start = app.listen = function () {
  return httpServer.listen.apply(httpServer, arguments);
};
app.start(PORT);
module.exports = io;
