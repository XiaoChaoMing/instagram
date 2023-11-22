var app = angular.module("instarApp");
app.controller("HomeCtrl", function ($scope, $http, $rootScope, $location) {
  $scope.user;
  $scope.commentText = "";
  $rootScope.currentEditPost;
  $rootScope.currentPost = {
    id: 0,
    Comment: [],
  };
  let config;
  $scope.loadUser = function () {
    var loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      $scope.user = JSON.parse(loggedInUser).data;

      config = {
        headers: {
          Authorization: `Bearer ${$scope.user.token}`,
        },
      };
    }
  };
  $scope.loadPost = function () {
    $http.get("/getPost", config).then(
      function (response) {
        if (response.data.status === 200) {
          const data = response.data.data.data[0];
          $scope.posts = data.map(function (post) {
            post.Media = JSON.parse(post.Media);
            post.Comment = JSON.parse(post.Comment);
            post.Reactions = JSON.parse(post.Reactions);
            post.TimeFromNow = moment(post.createdAt).fromNow();
            return post;
          });
        }
      },
      function (error) {
        console.log(error);
      }
    );
    window.Mysocket.on("newPost", (data) => {
      $scope.$apply(function () {
        $scope.loadPost();
      });
    });
    window.Mysocket.on("newNotify", (data) => {
      $scope.$apply(function () {
        $scope.LoadNotify();
        $scope.loadPost();
      });
    });
    window.Mysocket.on("newComment", (data) => {
      const comment = data.data.data.comment;
      $rootScope.currentPost.Comment = comment[0];
      $scope.loadPost();
      $scope.scrollBottom();
    });
    window.Mysocket.on("newReact", (data) => {
      $scope.loadPost();
    });
    window.Mysocket.on("updatePost", (data) => {
      $scope.$apply(function () {
        $scope.loadPost();
      });
    });
  };
  $scope.loadRecommentUser = function () {
    $http.get("/highestFollowings/" + $scope.user.id, config).then(
      function (response) {
        if (response.data.status === 200) {
          const data = response.data.data.data.fl[0];
          $scope.recommentUser = data;
        }
      },
      function (error) {
        console.log(error);
      }
    );
  };
  $scope.getMediaType = function (mediaFile) {
    var extension = mediaFile.split("?")[0].split(".").pop();
    switch (extension) {
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return "image";
      case "mp4":
      case "webm":
        return "video";
      default:
        return "";
    }
  };
  $scope.test = function ($event) {
    var imgIndex = 0;
    let touchStartX = null;
    var deltaX = 0;
    const currentIdx = (x) => {
      imgIndex += x;
    };
    // $(".btn-prevPost").hide();

    const scroll = (width, maintpost) => {
      $(maintpost)
        .children("ul")
        .animate({ scrollLeft: "+=" + width + "px" }, 500);
    };

    const maintpost = angular.element($event.target).parent();
    const width = maintpost.children("ul").width();
    const target = angular.element(
      maintpost[0].querySelector(".btn-indexPost .activeImg")
    );
    if ($event.target.classList.contains("btn-nextPost")) {
      if (target.next().is(":empty")) {
        target.toggleClass("activeImg");
      }
      target.next().toggleClass("activeImg");
    } else {
      if (target.prev().is(":empty")) {
        target.toggleClass("activeImg");
      }
      target.prev().toggleClass("activeImg");
    }
    $($event.target).is(".btn-nextPost")
      ? scroll(width, maintpost)
      : scroll(-width, maintpost);
  };
  $scope.getAvatar = function () {
    return (
      $scope.user.Avatar ||
      "./../../src/images/avatar/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg"
    );
  };
  $scope.createPost = function () {
    var filesArray = Array.from($scope.Mediafile);
    var filenames = filesArray.map(function (file) {
      return file.name;
    });
    const post = {
      UserId: $scope.user.id,
      status: $scope.Status,
      Types: 1,
      mediaFiles: filenames,
    };
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

    Promise.all(promises)
      .then(() => {
        return $http.post("/createPost", post, config);
      })
      .then((response) => {
        if (response.data.status === 200) {
          alert("Đăng baif thành công");
          $(".createCaption textarea").val("");
        } else {
          alert("Đăng baif thaast bai");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  $scope.LoadNotify = function () {
    const UserId = $scope.user.id;

    $http.get("/notify/" + UserId, config).then(
      function (response) {
        if (response.data.status === 200) {
          const data = response.data.data;
          $scope.notifys = data.data.notify[0];
        }
      },
      function (error) {
        console.log(error);
      }
    );
  };
  $scope.deleteNotify = function (id) {
    $http.post("/delNotify/" + id, config).then(
      function (response) {
        if (response.data.status === 200) {
          alert("xoa thanh cong");
          $scope.LoadNotify();
        }
      },
      function (error) {
        console.log(error);
      }
    );
  };
  $scope.likePost = function (postId, toUserId) {
    const like = {
      PostId: postId,
      UserId: $scope.user.id,
      toUserId: toUserId,
    };
    $http.post("/reactPost", like, config).then(
      function (response) {
        if (response.data.status === 200) {
          alert("ban da thich bai viet");
          $scope.loadPost();
        } else {
          alert("ban da bo thich bai viet");
          $scope.loadPost();
        }
      },
      function (error) {
        console.log(error);
      }
    );
  };
  $scope.handleShowComment = function (post) {
    $(".comment-overlay").show();
    $rootScope.currentPost = post;
    console.log($rootScope.currentPost);
  };
  $scope.commentPost = function (postId, toUserId) {
    const comment = {
      postId: postId,
      userId: $scope.user.id,
      toUserId: toUserId,
      commentText: $scope.commentText,
    };
    $http.post("/commentPost", comment, config).then(
      function (response) {
        if (response.data.status === 200) {
          alert("ban da comment bai viet");
          $scope.loadPost();
        }
      },
      function (error) {
        console.log(error);
      }
    );
  };
  $scope.followUser = function (id) {
    const followI4 = {
      followerId: id,
      followingId: $scope.user.id,
    };
    console.log(followI4);
    $http.post("/follow", followI4, config).then(function (response) {
      if (response.data.status === 200) {
        alert("follow thanh cong");
      }
    });
  };
  $scope.logout = function () {
    localStorage.removeItem("loggedInUser");
    window.location.href = "./pages/login/login.html";
  };
  $scope.showProfile = function (post) {
    $(".postUserProfile").css("display", "flex");
    console.log(post.userId);
    $http.get("/profile/" + post.userId).then(
      function (response) {
        if (response.data.status === 200) {
          const data = response.data.data.data[0];
          $scope.postUserPrf = data;
          $scope.postUserPrf.id = post.userId;
          $scope.postUserPrf.JsonPosts = JSON.parse(data.JsonPosts).slice(0, 3);
          $scope.postUserPrf.Follower = JSON.parse(data.Follower);
          $scope.postUserPrf.Following = JSON.parse(data.Following);
        }
      },
      function (error) {
        console.log(error);
      }
    );
  };
  $scope.hideProfile = function () {
    $(".postUserProfile").css("display", "none");
  };
  $scope.scrollBottom = function () {
    const scrollT = $(".md_interact-comment");
    console.log(scrollT.scrollTop);
    $(".add-comment input").val("");
    scrollT.animate(
      {
        scrollTop: 9999,
      },
      1000
    );
  };
  $scope.gotoProfile = function (path, post) {
    localStorage.setItem("currentPost", JSON.stringify(post));
    $location.path(path);
  };
  $scope.searchUser = function () {
    const info = {
      keyword: $scope.searchInput,
      pageNumber: 1,
    };
    console.log(info);
    $http.post("/searchUser", info).then(
      function (response) {
        if (response.data.status === 200) {
          const data = response.data.data.data.data[0];
          $scope.searchResult = data;
        }
      },
      function (error) {
        console.log(error);
      }
    );
  };
  $scope.toggleMenu = function () {
    console.log("test");
    $(".menuPost").toggleClass("togglePostMenu");
  };
  $scope.editPost = function (post) {
    $(".editPost_overlay").show();
    $rootScope.currentEditPost = post;
    console.log($rootScope.currentEditPost);
  };
  $scope.deleteMediaFile = function (media) {
    let userConfirm = confirm("ban co chac la muon xoa anh khong");
    if (userConfirm === true) {
      let index = $rootScope.currentEditPost.Media.indexOf(media);
      $rootScope.currentEditPost.Media[index].type = 0;
      console.log($rootScope.currentEditPost);
    }
  };
  $scope.uploadFile = function (files) {
    var filesArray = Array.from(files);
    const promises = filesArray.map((file, index) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          window.Mysocket.emit(
            "sendFile",
            { file: event.target.result, name: file.name },
            (status) => {
              console.log(status);
              $rootScope.currentEditPost.Media.push({
                mediaFile: reader.result,
                type: 1,
                name: file.name,
              });
              resolve(reader.result);
            }
          );
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });
    Promise.all(promises).then(() => {
      console.log("upload successful");
    });
  };
  $scope.updatePost = function () {
    $http
      .post("/updatePost", $rootScope.currentEditPost)
      .then(function (response) {
        console.log(response);
      });
  };
  $scope.deletePost = function (post) {
    console.log(post.id);
    let userConfirm = confirm("ban co chac la muon xoa post khong");
    if (userConfirm === true) {
      $http.post("/deletePost/" + post.id).then(
        function (response) {
          if (response.status === 200) {
            alert("post deleted");
          }
        },
        function (error) {
          console.log(error);
        }
      );
    }
  };
  $scope.LoadImage = function () {};
  $scope.loadUser();
  $scope.loadPost();
  $scope.LoadNotify();

  $scope.loadRecommentUser();
});
