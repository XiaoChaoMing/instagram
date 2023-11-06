let data = localStorage.getItem("loggedInUser");
data = JSON.parse(data);
let id = data.data.id;
window.Mysocket = io({
  query: {
    userId: id,
  },
});

window.Mysocket.on("connect", () => {
  console.log("ket noi thanh cong");
});
window.Mysocket.on("apiEvent", (data) => {
  console.log(data);
});
window.Mysocket.on("followEvent", (data) => {
  console.log(data);
});
