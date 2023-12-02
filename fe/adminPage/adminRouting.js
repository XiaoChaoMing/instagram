var app = angular.module("adminApp", ["ngRoute"]);

app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");
  $routeProvider
    .when("/", {
      templateUrl: "./../pages/admin/maintPage.html",
      requireAuth: true,
      controller: "AdminCtrl",
    })
    .when("/postList", {
      templateUrl: "./pages/admin/postList.html",
      requireAuth: true,
      controller: "AdminCtrl",
    })
    .when("/analystic", {
      templateUrl: "./pages/admin/analystic.html",
      requireAuth: true,
      controller: "analysticCtrl",
    })
    .otherwise({
      redirectTo: "/login",
    });
});
var app = angular.module("adminApp");
app.directive("selectNgFiles", function () {
  return {
    require: "ngModel",
    link: function postLink(scope, elem, attrs, ngModel) {
      elem.on("change", function (e) {
        var files = elem[0].files;
        ngModel.$setViewValue(files);
      });
    },
  };
});
app.factory("socket", [
  "$rootScope",
  function ($rootScope) {
    var socket = window.mySocket;
    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        });
      },
    };
  },
]);

app.run(function ($rootScope, $location) {
  $rootScope.$on("$routeChangeStart", function (event, next, current) {
    var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (next.requireAuth && !loggedInUser) {
      window.location.href = "./../pages/login/login.html";
    }
  });
});
