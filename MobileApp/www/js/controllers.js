angular.module("starter")

    .constant("ref", "localhost:8000")

    .controller("loginController", function ($scope, $http, ref) {

        $scope.login = function () {
            console.log($http)
            $http.post(ref + "/api/salesmanLogin", $scope.salesman)
                .success(function(data){
                    console.log(data)
                }, function(err){
                    console.log(err)
                })
        }

    });