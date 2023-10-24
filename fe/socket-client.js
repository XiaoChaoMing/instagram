import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("ket noi thanh cong");
});

socket.on("message", (data) => {
  console.log("dcmm", data);
});

socket.emit("message", "from client with love");

socket.disconnect();
