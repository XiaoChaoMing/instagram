var app = angular.module("instarApp");
app.controller("MessageCtrl", function ($scope, $http) {
  $scope.currentFriend;
  $scope.currentChat;
  $scope.loadUserProfile = function () {
    var loggedInUser = localStorage.getItem("loggedInUser");
    let userid;
    if (loggedInUser) {
      $scope.userid = JSON.parse(loggedInUser).data.id;
    }
    console.log($scope.userid);
    $http.get("/MessageItem/" + $scope.userid).then(
      function (response) {
        if (response.data.status === 200) {
          const data = response.data.data.data.friendLists[0];
          $scope.friendLists = data;
        }
      },
      function (error) {
        console.log(error);
      }
    );
    window.Mysocket.on("newMsg", (res) => {
      const data = res.data.data.Message[0][0];
      $scope.newMessage = data;

      $scope.newMessage.msgAll = JSON.parse(data.msgSend).concat(
        JSON.parse(data.msgRecive)
      );
      $scope.newMessage.msgAll = $scope.newMessage.msgAll.filter(
        (value) => value !== null
      );
      $scope.newMessage.msgAll.sort((a, b) => {
        if (a && b && a.createdAt && b.createdAt) {
          return new Date(a.createdAt) - new Date(b.createdAt);
        } else {
          return 0;
        }
      });
      if ($scope.PrvMessage.id === $scope.newMessage.id) {
        $scope.currentChat.msgAll = $scope.newMessage.msgAll;
      }

      $scope.scrollBottom();
    });
  };

  $scope.getPrivateMessage = function (friendId) {
    $scope.currentFriend = friendId;
    const info = {
      fromUserId: $scope.userid,
      toUserId: friendId,
    };
    $http.post("/getPrivateMs", info).then(
      function (response) {
        if (response.data.status === 200) {
          const data = response.data.data.data.Message[0][0];
          $scope.PrvMessage = data;
          if (JSON.parse(data.msgSend) || JSON.parse(data.msgRecive)) {
            if (JSON.parse(data.msgSend) && JSON.parse(data.msgRecive)) {
              $scope.PrvMessage.msgAll = JSON.parse(data.msgSend).concat(
                JSON.parse(data.msgRecive)
              );
            } else {
              JSON.parse(data.msgSend) !== null
                ? ($scope.PrvMessage.msgAll = JSON.parse(data.msgSend))
                : ($scope.PrvMessage.msgAll = JSON.parse(data.msgRecive));
            }

            $scope.PrvMessage.msgAll = $scope.PrvMessage.msgAll.filter(
              (value) => value !== null
            );
            $scope.PrvMessage.msgAll.sort((a, b) => {
              if (a && b && a.createdAt && b.createdAt) {
                return new Date(a.createdAt) - new Date(b.createdAt);
              } else {
                return 0;
              }
            });
          } else {
            $scope.PrvMessage.msgAll = [];
          }

          $scope.currentChat = $scope.PrvMessage;
          console.log($scope.currentChat, $scope.PrvMessage);
          $scope.scrollBottom();
        }
      },
      function (error) {
        console.log(error);
      }
    );
  };

  $scope.sendMessage = function () {
    const msg = {
      fromUserId: $scope.userid,
      toUserId: $scope.currentFriend,
      messageText: $scope.MessText,
    };
    $http.post("/SendMessage", msg).then(
      function (response) {
        if (response.data.status === 200) {
          const data = response.data.data;
        }
      },
      function (error) {
        console.log(error);
      }
    );
  };
  $scope.scrollBottom = function () {
    const scrollT = $(".chat-box_maint");
    $(".add-comment input").val("");
    scrollT.animate(
      {
        scrollTop: 9999,
      },
      1000
    );
  };
  $scope.loadUserProfile();
});
