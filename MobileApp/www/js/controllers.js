angular.module("starter")

    .constant("ref", "http://localhost:8000")

    .controller("loginController", function ($scope, $http, ref, $state) {

        $scope.login = function () {
            $http.post(ref + "/api/salesmanLogin", $scope.salesman)
                .success(function (data) {
                    if (data.uniqueId) {
                        console.log(data);
                        localStorage.setItem("token", data.uniqueId);
                        $state.go("dashboard");
                    }
                })
                .error(function (err) {
                    console.log(err);
                })
        }

    })

    .controller("dashboardController", function ($scope) {
        $scope.greet = "dashboard";
    })