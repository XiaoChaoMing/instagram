var app = angular.module("instarApp");
app.controller("AdminCtrl", function ($scope, $http, $rootScope, $location) {
  $scope.user;
  $scope.commentText = "";
  $rootScope.currentEditPost;
  $rootScope.currentPost = {
    id: 0,
    Comment: [],
  };
});
