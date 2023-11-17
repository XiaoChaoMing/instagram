var app = angular.module("instarApp");
app.controller("ProfileCtrl", function ($scope, $http) {
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
    var loggedInUser = localStorage.getItem("loggedInUser");
    let userid;
    if (loggedInUser) {
      userid = JSON.parse(loggedInUser).data.id;
    }

    $http.get("/profile/" + userid).then(
      function (response) {
        if (response.data.status === 200) {
          const data = response.data.data.data[0];
          $scope.user = data;
          $scope.user.id = userid;
          $scope.user.JsonPosts = JSON.parse(data.JsonPosts);
          $scope.user.Follower = JSON.parse(data.Follower);
          $scope.user.Following = JSON.parse(data.Following);
          $scope.loadAvatar();
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
              newProfile.Avatar = $scope.Mediafile[0].name;
            }
          }
        });
      });
    } else {
      $http.post("/updateProfile", users).then((response) => {
        if (response.data.status === 200) {
          alert("Sua thong tin thanh cong");
        }
      });
    }
  };

  $scope.loadUserProfile();
});
