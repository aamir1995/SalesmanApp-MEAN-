
angular.module("app", ['ui.router', 'ngMaterial', 'ngMdIcons', 'firebase', 'leaflet-directive'])

    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

        $stateProvider
            .state("login", {
                url: "/login",
                templateUrl: "/templates/signin.html",
                controller: "loginController",

            })
            .state("signup", {
                url: "/signup",
                templateUrl: "/templates/signup.html",
                controller: "signupController",

            })
            .state("userProfile", {
                url: "/userProfile",
                templateUrl: "/templates/userProfile.html",
                controller: "userProfileController",
                loginRequired: true
            })
            .state("newCompany", {
                url: "/newCompany",
                templateUrl: "/templates/company.html",
                controller: "newCompanyController",
                loginRequired: true
            })
            .state("products", {
                url: "/products",
                templateUrl: "./templates/viewProducts.html",
                controller: "productsController"
            })
            .state("orders", {
                url: "/orders",
                templateUrl: "./templates/orders.html",
                controller: "ordersController"
            })
            .state("location", {
                url: "/location/:lat/:lng",
                templateUrl: "./templates/location.html",
                controller: "locationController"
            })
        $urlRouterProvider.otherwise("/");

        $httpProvider.interceptors.push("httpInterceptor");
    })



    .run(function ($rootScope, $state) {

        console.log("runPhase running perfectly");

        $rootScope.$on("$stateChangeStart", function (event, toState) {
            var firebaseToken = localStorage.getItem("token");
            console.log(toState.loginRequired);
            console.log("under runphase nested function");
            if (toState.loginRequired && !firebaseToken) {
                event.preventDefault();
                $state.go("login");
            }
        });
    })


    .factory("httpInterceptor", function () {
        return {
            request: function (config) {
                console.log("factory is running perfectly");
                var token = localStorage.getItem("token");
                if (token) {
                    config.url = config.url + "?token=" + token;
                }
                return config;
            }
        }
    })


    .service("getCompanyService", function ($http, $q) {
        console.log('company service')


        this.getCompanyData = function () {
            var deferred = $q.defer();

            $http.get("api/getCompanyInfo")
                .then(function (response) {
                    deferred.resolve(response);

                }, function (err) {
                    deferred.reject(err);

                })
            return deferred.promise;
        }

    })

    .service("getSalesmenInfo", function ($http, $q) {

        this.getSalesmanData = function () {
            var deferred = $q.defer();

            $http.get("api/getSalesmanInfo")
                .then(function (response) {
                    deferred.resolve(response);
                }, function (err) {
                    deferred.reject(err)
                })
            return deferred.promise;
        }
    })

    .service("getAllData", function ($http) {
        console.log("getAllData service");

        this.getAllData = function (url) {
            $http.get(url)
                .then(function (response) {
                    console.log("got data AGAIN", response)
                }, function err(err) {
                    console.log(err);
                });
        }

    })

    .service("toastService", function ($mdToast) {

        var last = {
            bottom: false,
            top: true,
            left: false,
            right: true
        };

        var toastPosition = angular.extend({}, last);
        var getToastPosition = function () {
            sanitizePosition();
            return Object.keys(toastPosition)
                .filter(function (pos) { return toastPosition[pos]; })
                .join(' ');
        };

        function sanitizePosition() {
            var current = toastPosition;
            if (current.bottom && last.top) current.top = false;
            if (current.top && last.bottom) current.bottom = false;
            if (current.right && last.left) current.left = false;
            if (current.left && last.right) current.right = false;
            last = angular.extend({}, current);
        }

        this.showSimpleToast = function (param) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(param)
                    .position(getToastPosition())
                    .hideDelay(2000)
                );
        };
    })

    .service("getUserName", function ($http) {

        this.getCurrentUser = function () {
            $http.get("api/getUserDataAgain")
                .success(function (response) {
                    localStorage.setItem('currentUser', response);
                }, function (err) {
                    console.log(err);
                });
        }

    })
