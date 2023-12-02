var app = angular.module("adminApp", []);
app.controller("LoginCtrl", function ($scope, $http, $location) {
  $scope.login = function (user) {
    $http.post("http://localhost:8002/loginAdmin", user).then(
      function (response) {
        if (response.data.status === 200) {
          if (response.data.data.data.isAdmin) {
            alert("Đăng nhập thành công");
            window.location.href = "http://localhost:8002/admin";
            localStorage.setItem(
              "loggedInUser",
              JSON.stringify(response.data.data)
            );
          } else {
            alert("bạn không phải admin");
          }
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
app.factory("authInterceptor", [
  "$q",
  "$location",
  function ($q, $location) {
    return {
      responseError: function (response) {
        if (response.status === 401) {
          alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
          localStorage.removeItem("loggedInUser");
          $location.path("/login");
        }
        return $q.reject(response);
      },
    };
  },
]);

app.config([
  "$httpProvider",
  function ($httpProvider) {
    $httpProvider.interceptors.push("authInterceptor");
  },
]);
