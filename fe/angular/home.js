var app = angular.module("instarApp");
app.controller("HomeCtrl", function ($scope, $http) {
  $scope.user;
  $scope.loadUser = function () {
    var loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      $scope.user = JSON.parse(loggedInUser).data;
      console.log(JSON.parse(loggedInUser).data);
    }
  };
  // $scope.getPostMedia = function(){
  //   return
  // }
  $scope.loadPost = function () {
    $http.get("/getPost").then(
      function (response) {
        if (response.data.status === 200) {
          const data = response.data.data.data[0];
          $scope.posts = data.map(function (post) {
            post.Media = JSON.parse(post.Media);
            return post;
          });

          console.log($scope.posts);
        }
      },
      function (error) {
        console.log(error);
      }
    );
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
        return $http.post("/createPost", post);
      })
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response.data);
          alert("Đăng baif thành công");
        } else {
          alert("Đăng baif thaast bai");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  $scope.logout = function () {
    localStorage.removeItem("loggedInUser");
    window.location.href = "./pages/login/login.html";
  };
  $scope.loadUser();
  $scope.loadPost();
});
