var app = angular.module("instarApp", []);
app.controller("LoginCtrl", function ($scope, $http, $location) {
  $scope.login = function (user) {
    $http.post("http://localhost:3000/login", user).then(
      function (response) {
        if (response.data.status === 200) {
          alert("Đăng nhập thành công");
          localStorage.setItem(
            "loggedInUser",
            JSON.stringify(response.data.data)
          );
          window.location.href = "/";
        } else {
          alert("Đăng nhập thất bại");
        }
      },
      function (error) {
        console.log(error);
      }
    );
  };
});
