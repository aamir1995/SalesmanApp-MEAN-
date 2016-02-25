angular.module("starter")

    .constant("ref", "http://localhost:8000")

    .controller("loginController", function ($rootScope, $scope, $http, ref, $state) {

        $scope.login = function (salesman) {
            console.log(salesman);
            $http.post(ref + "/api/salesmanLogin", salesman)
                .success(function (data) {

                    if (data.uniqueId) {
                        console.log(data);
                        $rootScope.salesmanDetails = data;
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


    })

    .controller("orderController", function (ref, $http, $scope, $firebaseArray) {

        var fireRef = new Firebase("https://salesmanapp101.firebaseio.com/")

        $scope.token = localStorage.getItem("token");
        $scope.orders = $firebaseArray(fireRef.child($scope.token));


        $http.get(ref + "/api/getProducts")
            .success(function (data) {
                console.log(data);
                $scope.products = data;
                //console.log($scope.products);
            }, function (err) {
                console.log(err);
            }
                )

        // $scope.change1 = function (arg) {
        //     $scope.agr = arg;
        //     console.log(arg);
        // }

        // Save order to firebase
        $scope.takeOrder = function (arg) {
            $scope.orders.$add({
                name: arg.name,
                quantity: arg.quantity
            })
        }
        
        // Save to order to MongoDB and remove it from Firebase
        $scope.sendDelivery = function () {
            $http.post(ref + "/api/order", $scope.orders)
                .success(function (data) {
                    console.log(data)
                }, function (err) {
                    console.log(err)
                })
        }

    })