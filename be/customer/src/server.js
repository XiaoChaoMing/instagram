const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const { PORT } = require("./config/config");
const expressApp = require("./express-app");
const { join } = require("path");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const corsOptions = {
  origin: "http://127.0.0.1:8001",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
require("./bd-connection");
require("./associate");

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.static(path.join(__dirname, "./../../../fe")));

app.get("/", (req, res) => {
  res.json({
    status: 200,
    notify: "trang chu",
  });
});
expressApp(app);

io.on("connection", (socket) => {
  console.log("user connected");
  console.log(socket.id);
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  //socket event handler
  socket.on("event", () => {});
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

server.listen(3000, () => {
  console.log("listening on port 3000");
});
