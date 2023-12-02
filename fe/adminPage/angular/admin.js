var app = angular.module("adminApp");
app.controller("AdminCtrl", function ($scope, $http, $rootScope, $location) {
  $scope.user;
  $scope.currentUser;
  $scope.commentText = "";
  $rootScope.currentEditPost;
  $scope.totalUser;
  $scope.userLists;
  $rootScope.isBan = false;
  $rootScope.currentId;
  $rootScope.CurrentPost;
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
  window.Mysocket.on("banSuccess", (data) => {
    if (data) {
      console.log(data);

      $scope.loadBanList();
    }
  });
  window.Mysocket.on("PermissionSuccess", (data) => {
    if (data) {
      console.log(data);
      $scope.loadTotalUsers();
    }
  });
  $scope.loadTotalUsers = async function () {
    await $http.get("/getAllUsers").then(
      async function (response) {
        if (response.data.status === 200) {
          const prm = await new Promise((resolve) => {
            window.Mysocket.emit("loadUserOnline", (calback) => {
              $rootScope.totalVisiter = Object.keys(calback.data.data);
              resolve();
            });
          });

          Promise.all([prm]).then(() => {
            $scope.totalUser = response.data.data[1];
            $scope.userLists = response.data.data[0].map((user) => {
              user.createdAt = moment(user.createdAt).format("YYYY-MM-DD");
              if ($rootScope.totalVisiter) {
                user.isOnline = $rootScope.totalVisiter.some((idUser) => {
                  return idUser == user.id;
                });
              }

              return user;
            });
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
  $scope.selectUser = async function (id, admin) {
    const menu = document.querySelector(".userMenuOverlay");
    menu.classList.add("active");
    $rootScope.isBan = $scope.banList.some((ban) => ban.accountId === id);
    $rootScope.currentId = id;
    $rootScope.isAdmin = admin;
  };
  $scope.banUser = function () {
    $http.get("/banUser/" + $rootScope.currentId).then(
      function (response) {
        if (response.data.status === 200) {
          alert("successfully");
        }
      },
      function (error) {
        console.log(error);
      }
    );
  };
  $scope.unBanUser = function () {
    $http.get("/unbanUser/" + $rootScope.currentId).then(
      function (response) {
        if (response.data.status === 200) {
          alert("successfully");
        }
      },
      function (error) {
        console.log(error);
      }
    );
  };
  $scope.adminPermission = function () {
    const data = {
      id: $rootScope.currentId,
      admin: !$rootScope.isAdmin,
    };
    $http.post("/adminPermissions", data).then(
      function (response) {
        if (response.data.status === 200) {
          alert("permission successfully");
        }
      },
      function (error) {
        console.log(error);
      }
    );
  };
  $scope.loadBanList = function () {
    $http.get("/getBanList").then(
      function (response) {
        if (response.data.status === 200) {
          $scope.banList = response.data.data.data.banList[0];
        }
      },
      function (error) {
        console.log(error);
      }
    );
  };
  $scope.loadUserProfile = function (userid) {
    var maintUser = localStorage.getItem("loggedInUser");
    $scope.maintUser = JSON.parse(maintUser);
    console.log($scope.maintUser.data.id);
    $scope.currentUser;
    $http.get("/profile/" + userid).then(
      function (response) {
        if (response.data.status === 200) {
          const data = response.data.data.data[0];
          $scope.currentUser = data;
          $scope.currentUser.id = userid;
          $scope.currentUser.JsonPosts = JSON.parse(data.JsonPosts);
          $scope.currentUser.Follower = JSON.parse(data.Follower);
          $scope.currentUser.Following = JSON.parse(data.Following);
          console.log($scope.currentUser);
        }
      },
      function (error) {
        console.log(error);
      }
    );
  };
  $scope.showPost = function (post) {
    const postoverLay = document.querySelector(".postModalOverLay");
    postoverLay.classList.add("active");
    $rootScope.CurrentPost = post;
    console.log($rootScope.CurrentPost.Users[0]);
  };

  $scope.loadTotalUsers();
  $scope.loadTotalPosts();
  $scope.loadBanList();
});
