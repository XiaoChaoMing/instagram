import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

const socket = io();

socket.on("connect", () => {
  console.log("ket noi thanh cong");
});
