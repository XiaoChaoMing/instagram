var app = angular.module("adminApp");
app.controller(
  "analysticCtrl",
  function ($scope, $http, $rootScope, $location) {
    $scope.flag = true;
    $scope.user;
    $scope.currentUser;
    $scope.commentText = "";
    $rootScope.currentEditPost;
    $rootScope.totalVisiter = 0;

    $scope.loadTotalPosts = function () {
      $http.get("/getPost").then(
        function (response) {
          if (response.data.status === 200) {
            $scope.postByMonth = response.data.data.data[0];
            $scope.postByMonth.forEach((post) => {
              post.createdAt = moment(post.createdAt).format("YYYY-MM-DD");
            });
            console.log($scope.postByMonth);
          }
        },
        function (error) {
          console.log(error);
        }
      );
    };
    $scope.loadTotalUsers = async function () {
      await $http.get("/getAllUsers").then(
        async function (response) {
          if (response.data.status === 200) {
            const prm = await new Promise((resolve) => {
              $scope.loadBanList();
              window.Mysocket.emit("loadUserOnline", (calback) => {
                $rootScope.totalVisiter = Object.keys(calback.data.data);
                resolve();
              });
            });

            Promise.all([prm]).then(async () => {
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

              await $scope.createDonutChart(
                $rootScope.totalVisiter,
                $scope.totalUser,
                $scope.banList
              );
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
    $scope.loadPostChart = function () {
      $http.get("/postChartByYear").then(
        function (response) {
          if (response.data.status === 200) {
            const data = response.data.data.data.chart[0];
            $scope.currentYear = data.filter((month) => {
              return month.Year === new Date().getFullYear();
            });
            $scope.prevYear = data.filter((month) => {
              return month.Year === new Date().getFullYear() - 1;
            });
            $scope.createLineChart($scope.currentYear, $scope.prevYear);
          }
        },
        function (error) {
          console.log(error);
        }
      );
    };
    $scope.loadUserWeeklyPost = function (id) {
      $http.get("/getUserWeeklyPost/" + id).then(
        function (response) {
          if (response.data.status === 200) {
            const data = response.data.data.data.chart[0].map((posts) => {
              return posts.PostCount;
            });

            $scope.createBarChart(data);
          }
        },
        function (error) {
          console.log(error);
        }
      );
    };
    $scope.createLineChart = function (currentYear, prevYear) {
      console.log(currentYear[0].Year);
      const crypost = currentYear.map((month) => {
        return month.PostCount;
      });
      const prevpost = prevYear.map((month) => {
        return month.PostCount;
      });
      const postsChart = document.getElementById("posts");
      new Chart(postsChart, {
        type: "line",
        data: {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              label: `totalPost of ${currentYear[0].Year}`,
              data: crypost,
              borderWidth: 2,
              borderColor: "rgba(255, 99, 132, 1)",
              tension: 0.4,
            },
            {
              label: `totalPost of ${prevYear[0].Year}`,
              data: prevpost,
              borderColor: "rgba(55, 99, 132, 1)",
              borderWidth: 2,
              tension: 0.4,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    };
    $scope.createDonutChart = function (totalVisiter, totalUser, banList) {
      const usersChart = document.getElementById("users");
      new Chart(usersChart, {
        type: "doughnut",
        data: {
          labels: ["online", "ofline", "ban"],
          datasets: [
            {
              label: "user",
              data: [
                totalVisiter.length,
                totalUser - totalVisiter.length - banList.length,
                banList.length,
              ],
              borderWidth: 1,
              backgroundColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "green",
              ],
              tension: 0.4,
            },
          ],
        },
      });
    };
    $scope.createBarChart = function (data) {
      const usersChart = document.getElementById("Weeklyposts");
      if (window.myChart instanceof Chart) {
        window.myChart.destroy();
      }

      window.myChart = new Chart(usersChart, {
        type: "bar",
        data: {
          labels: ["week 1", "week 2", "week 3", "week 4"],
          datasets: [
            {
              label: `posts in month ${new Date().getMonth()}`,
              data: data,
              borderWidth: 1,
              backgroundColor: ["rgba(54, 162, 235, 1)"],
              tension: 0.4,
            },
          ],
        },
      });
    };
    $scope.loadPostChart();
    $scope.loadTotalUsers();
  }
);
