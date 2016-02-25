angular.module("app")

    .constant("fireRef", 'https://salesmanapp101.firebaseio.com/')

    .controller("indexController", function ($rootScope, $scope) {

        $rootScope.headerName = "Salesman App";
        $rootScope.headerElements = true;

    })

    .controller("loginController", function ($rootScope, $scope, $http, $state, toastService) {
        $scope.progress1 = false;
        $scope.user = {};

        $scope.login = function () {
            $scope.progress1 = true;
            $http.post("api/login", { data: $scope.user })
                .success(function (response) {
                    if (response.token) {
                        localStorage.setItem('token', response.token);
                        $scope.progress1 = false;
                        $state.go("userProfile");
                        toastService.showSimpleToast()

                    }
                })
                .error(function (err) {
                    console.log("error in sign in");
                    console.log(err);
                    $scope.progress1 = false;
                    $state.go("/login");
                })
        }

    })


    .controller("signupController", function ($scope, $http, $state, toastService) {
        $scope.progress2 = false;
        $scope.user = {};
        $scope.saveData = function () {
            $scope.progress2 = true;
            $http.post("api/signup", { data: $scope.user })
                .success(function (data) {
                    toastService.showSimpleToast()
                    console.log(data);
                    console.log("successfully added (index.js)")
                    $scope.progress2 = false;
                    $state.go("login");
                })
                .error(function (err) {
                    $scope.progress2 = false;
                    console.log(err);
                })
        }

    })


    .controller("userProfileController", function ($scope, $rootScope, getCompanyService, getSalesmenInfo, $mdDialog, $mdMedia, $http, fireRef, $firebaseArray) {
        var fireRef = new Firebase(fireRef);

        $scope.token = localStorage.getItem("token");
        $scope.orders = $firebaseArray(fireRef.child($scope.token));
        // $scope.orders.$loaded(function () {
        //     console.log($scope.orders);
        //     console.log($scope.orders.length);
        //     alert("order recieved")
        // })

        //     $scope.showActionToast = function () {
        //         var toast = $mdToast.simple()
        //             .textContent('Action Toast!')
        //             .action('OK')
        //             .highlightAction(false)
        //             .position($scope.getToastPosition());
        //         $mdToast.show(toast).then(function (response) {
        //             if (response == 'ok') {
        //                 alert('You clicked \'OK\'.');
        //             }
        //         });
        //     };
        // })


        $http.get("api/getUserDataAgain")
            .success(function (response) {
                console.log(response);
                $rootScope.currentUser = response;

            }, function (err) {
                console.log(err);
            });



        $rootScope.headerElements = false;
        getCompanyService.getCompanyData()
            .then(function (response) {
                $scope.company = response.data;
                $scope.ifCompany = true;
            }, function (error) {
                console.log(error);
            })


        getSalesmenInfo.getSalesmanData()
            .then(function (response) {
                console.log(response.data)
                $scope.allSalesmen = response.data;
                console.log($scope.allSalesmen)
            }, function (error) {
                console.log(error);
            })
        
        
        //add salesman FAB Button code
        $scope.showAdvanced = function (ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
            $mdDialog.show({
                controller: addSalesmenController,
                templateUrl: '../templates/addSalesmen.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: useFullScreen
            })
            $scope.$watch(function () {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function (wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });
        };

        function addSalesmenController($rootScope, $http, $scope, $mdDialog, $state, toastService) {

            $scope.createSalesman = function () {
                $scope.salesman.uniqueId = localStorage.getItem("token");
                $http.post("api/newSalesman", $scope.salesman)
                    .success(function () {
                        toastService.showSimpleToast()
                        $mdDialog.hide();
                        $state.go($state.current, {}, { reload: true })

                    })
            }
            $scope.hide = function () {
                $mdDialog.hide();
            };
            $scope.cancel = function () {
                $mdDialog.cancel();
            };
        }
        
        
        //add Product Button code
        $scope.addProduct = function (ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
            $mdDialog.show({
                controller: addProductController,
                templateUrl: '../templates/addProduct.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: useFullScreen
            })
            $scope.$watch(function () {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function (wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });
        };


        function addProductController($scope, $mdDialog, $http) {
            $scope.product = {
                firebaseToken: localStorage.getItem("token")
            }

            $scope.addProduct = function () {
                $http.post("api/addProduct", $scope.product)
                    .success(function (response) {
                        console.log(response);
                        console.log($scope.product)
                    })
                    .error(function (err) {
                        console.log(err);
                    })
            }


            $scope.hide = function () {
                $mdDialog.hide();
            };
            $scope.cancel = function () {
                $mdDialog.cancel();
            };
        }


    })


    .controller("newCompanyController", function ($scope, $http, $state, toastService) {
        $scope.token = localStorage.getItem("token");
        $scope.companyInfo = {};
        $scope.companyInfo.adminId = $scope.token;
        console.log($scope.companyInfo);
        console.log($scope.companyInfo.adminId);

        $scope.createCompany = function () {
            $http.post("api/newCompany", $scope.companyInfo)
                .then(function (data) {
                    toastService.showSimpleToast()
                    console.log(data + "from newCompanyController");
                    $state.go("userProfile")

                }, function (err) {
                    console.log(err);
                })

        }
    })

    .controller("productsController", function ($scope, $http) {
        $http.get("api/getProducts")
            .success(function (data) {
                console.log(data);
                $scope.products = data;
                console.log($scope.products);
            })
            .error(function (err) {
                console.log(err);
            })
    })

    .controller("ordersController", function ($scope, $http, fireRef, $firebaseArray) {
        var fireRef = new Firebase(fireRef);

        $scope.token = localStorage.getItem("token");
        $scope.orders = $firebaseArray(fireRef.child($scope.token));

        // Save to order to MongoDB and remove it from Firebase    
        $scope.sendDelivery = function (index) {
            $http.post("api/orders", $scope.orders[index])
                .success(function (data) {
                    console.log(data)
                    console.log("hello")
                    $scope.orders.$remove(index);
                })
                .error(function (err) {
                    console.log(err)
                })
        }
    })