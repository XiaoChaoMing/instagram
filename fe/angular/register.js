var app = angular.module("instarApp", []);
app.controller("RegisterCtrl", function ($scope, $http) {
  $scope.register = function (user) {
    $http.post("http://localhost:3000/register", user).then(
      function (response) {
        console.log(user);
        if (response.data.status === 200) {
          alert("Đăng ký thành công");
        } else {
          alert("Đăng ký thất bại");
        }
      },
      function (error) {
        console.log(error);
      }
    );
  };
});
