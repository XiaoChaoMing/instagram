var app = angular.module("instarApp");

app.controller("ProfileCtrl", function ($scope, $http, $rootScope) {
  $rootScope.currentPost;
  $scope.isFollowing;
  $scope.loadAvatar = function () {
    document
      .querySelector(".input-avt")
      .addEventListener("change", function () {
        var reader = new FileReader();
        reader.onload = function (e) {
          document.querySelector(".avtWrapper img").src = e.target.result;
        };
        reader.readAsDataURL(this.files[0]);
      });
  };
  $scope.loadUserProfile = function () {
    var maintUser = localStorage.getItem("loggedInUser");
    $scope.maintUser = JSON.parse(maintUser);
    console.log($scope.maintUser.data.id);
    let userid;
    var currentUser = localStorage.getItem("currentPost");
    userid = JSON.parse(currentUser);
    $http.get("/profile/" + userid).then(
      function (response) {
        if (response.data.status === 200) {
          const data = response.data.data.data[0];
          $scope.user = data;
          $scope.user.id = userid;
          $scope.user.JsonPosts = JSON.parse(data.JsonPosts);
          $scope.user.Follower = JSON.parse(data.Follower);
          $scope.user.Following = JSON.parse(data.Following);
          $scope.checkFollowings();
          $scope.loadAvatar();
        }
      },
      function (error) {
        console.log(error);
      }
    );
  };
  $scope.checkFollowings = function () {
    $scope.user.Follower.forEach((follower) => {
      if (follower.followingId === $scope.maintUser.data.id) {
        return ($scope.isFollowing = true);
      } else {
        return ($scope.isFollowing = false);
      }
    });
  };
  $scope.unFolow = function (userid) {
    const info = {
      followerId: userid,
      followingId: $scope.maintUser.data.id,
    };
    $http.post("/unfollow", info).then(
      function (response) {
        if (response.status === 200) {
          alert("unFollowing");
        }
      },
      function (error) {
        console.log(error);
      }
    );
  };
  $scope.folow = function (userid) {
    const info = {
      followerId: userid,
      followingId: $scope.maintUser.data.id,
    };
    $http.post("/follow", info).then(
      function (response) {
        if (response.status === 200) {
          alert("Following");
        }
      },
      function (error) {
        console.log(error);
      }
    );
  };
  $scope.updateProfile = async function () {
    let users = {
      userId: $scope.user.id,
      firstName: $scope.user.firstName,
      lastName: $scope.user.lastName,
      sexual: $scope.user.sexual,
      Country: $scope.user.Country,
      phoneNum: $scope.user.phoneNum,
      Email: $scope.user.Email,
      nickName: $scope.user.nickName,
      Description: $scope.user.Description,
    };
    if ($scope.Mediafile) {
      var filesArray = Array.from($scope.Mediafile);
      users.Avatar = $scope.Mediafile[0].name;
      const promises = filesArray.map((file, index) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            window.Mysocket.emit(
              "sendFile",
              { file: event.target.result, name: file.name },
              (status) => {
                console.log(status);
                resolve();
              }
            );
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });
      Promise.all(promises).then(() => {
        $http.post("/updateProfile", users).then((response) => {
          if (response.data.status === 200) {
            alert("Sua thong tin thanh cong");
            var loggedInUser = localStorage.getItem("loggedInUser");
            if (loggedInUser) {
              const newProfile = JSON.parse(loggedInUser).data;
              newProfile.Avatar = response.data.avt;
              newProfile.fullName = users.firstName + " " + users.lastName;
              newProfile.nickName = users.nickName;
              console.log(newProfile);
              localStorage.setItem(
                "loggedInUser",
                JSON.stringify({ data: newProfile })
              );
            }
          }
        });
      });
    } else {
      $http.post("/updateProfile", users).then((response) => {
        if (response.data.status === 200) {
          alert("Sua thong tin thanh cong");
          var loggedInUser = localStorage.getItem("loggedInUser");
          if (loggedInUser) {
            const newProfile = JSON.parse(loggedInUser).data;
            newProfile.fullName = users.firstName + " " + users.lastName;
            newProfile.nickName = users.nickName;
            console.log(newProfile);
            localStorage.setItem(
              "loggedInUser",
              JSON.stringify({ data: newProfile })
            );
          }
        }
      });
    }
  };
  $scope.handleShowFullPost = function (post) {
    $(".comment-overlay").show();
    $rootScope.currentPost = post;
    $rootScope.currentPost.Avatar = post.Users[0].Avatar;
    $rootScope.currentPost.firstName = post.Users[0].firstName;
    $rootScope.currentPost.lastName = post.Users[0].lastName;
    $rootScope.currentPost.Media = post.Users[0].Media;
    $rootScope.currentPost.Reations = post.Users[0].Reactions;
    $rootScope.currentPost.Comment = post.Users[0].Comment;
    $rootScope.currentPost.LikeByUser = false;
    if (post.Users[0].Reactions != null) {
      $rootScope.currentPost.LikeByUser = post.Reations.some((item) => {
        return item.userId === $scope.user.id;
      });
    }
  };

  $scope.loadUserProfile();
});
