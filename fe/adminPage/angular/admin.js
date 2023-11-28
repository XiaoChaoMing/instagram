var app = angular.module("adminApp");
app.controller("AdminCtrl", function ($scope, $http, $rootScope, $location) {
  $scope.user;
  $scope.commentText = "";
  $rootScope.currentEditPost;
  $rootScope.totalVisiter = 0;
  $scope.logoutAdmin = function () {
    localStorage.removeItem("loggedInUser");
    window.location.href = "./pages/login/login.html";
  };
  window.Mysocket.on("getUserOnline", (data) => {
    if (data) {
      $scope.$apply(function () {
        $rootScope.totalVisiter = Object.keys(data.data.data);
        $scope.loadTotalUsers();
      });
    }
  });
  $scope.loadTotalUsers = function () {
    $http.get("/getAllUsers").then(
      function (response) {
        if (response.data.status === 200) {
          $scope.totalUser = response.data.data[1];
          $scope.userLists = response.data.data[0].map((user) => {
            user.createdAt = moment(user.createdAt).format("YYYY-MM-DD");
            if ($rootScope.totalVisiter) {
              user.isOnline = $rootScope.totalVisiter.some((idUser) => {
                console.log(idUser == user.id);
              });
            }

            return user;
          });

          // const data = response.data.data.data[0];
          // $scope.posts = data.map(function (post) {
          //   post.Media = JSON.parse(post.Media);
          //   post.Comment = JSON.parse(post.Comment);
          //   post.Reactions = JSON.parse(post.Reactions);
          //   post.TimeFromNow = moment(post.createdAt).fromNow();
          //   if (post.Reactions !== null) {
          //     post.LikeByUser = post.Reactions.some((item) => {
          //       return item.userId === $scope.user.id;
          //     });
          //   }
          //   return post;
          // });
        }
      },
      function (error) {
        console.log(error);
      }
    );
  };
  $scope.loadTotalPosts = function () {
    $http.get("/getPost").then(
      function (response) {
        if (response.data.status === 200) {
          $scope.totalPost = response.data.data.data[1];

          // const data = response.data.data.data[0];
          // $scope.posts = data.map(function (post) {
          //   post.Media = JSON.parse(post.Media);
          //   post.Comment = JSON.parse(post.Comment);
          //   post.Reactions = JSON.parse(post.Reactions);
          //   post.TimeFromNow = moment(post.createdAt).fromNow();
          //   if (post.Reactions !== null) {
          //     post.LikeByUser = post.Reactions.some((item) => {
          //       return item.userId === $scope.user.id;
          //     });
          //   }
          //   return post;
          // });
        }
      },
      function (error) {
        console.log(error);
      }
    );
  };
  $scope.loadTotalPosts();
  $scope.loadTotalUsers();
  $scope.loadMaintView = function () {};
});
