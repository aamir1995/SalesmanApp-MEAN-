
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
