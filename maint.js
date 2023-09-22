const App = {
  isLogin: false,
  handleLogin: function () {},
  handleMenu: function () {
    $("div.item").each(function (index) {
      $(this).on("click", () => {
        $(this).children().children().toggleClass("blue");
      });
    });
  },
  Start: function () {
    this.handleMenu();
  },
};
App.Start();
