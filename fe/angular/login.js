var app = angular.module("instarApp", []);
app.controller("LoginCtrl", function ($scope, $http, $location) {
  $scope.adminPage = false;
  $scope.login = function (user) {
    if (!$scope.adminPage) {
      console.log("login");
      $http.post("http://localhost:8001/login", user).then(
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
    } else {
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
    }
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
