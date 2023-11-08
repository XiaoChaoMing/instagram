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

initializeApp(config);
const storage = getStorage();
const corsOptions = {
  origin: ["http://127.0.0.1:3000"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
const UserAuth = require("./api/middleware/auth");
require("./bd-connection");
require("./associate");

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.get("/", (req, res) => {
  res.sendFile(__dirname, "./../../../fe/index.html");
});

expressApp(app, io, storage);

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("user connected");
  console.log(userId);
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("sendFile", (data, callback) => {
    const imageBuffer = Buffer.from(data.file.split(";base64,")[1], "base64");
    const mountainsRef = ref(storage, "img/" + data.name);
    const uploadTask = uploadBytes(mountainsRef, imageBuffer);
    uploadTask.catch((error) => {
      console.error("Error uploading file:", error);
    });
    console.log("File received and saved");
    callback({ status: "success" });
  });
});
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  console.log(storage);
});
httpServer.listen(3000, () => {
  console.log("listening on port 3000");
});
