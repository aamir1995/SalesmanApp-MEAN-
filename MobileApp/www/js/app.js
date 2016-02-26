
angular.module('starter', ['ionic', 'firebase', 'ngCordova'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })


    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

        $stateProvider
            .state("login", {
                url: "/",
                templateUrl: "./templates/login.html",
                controller: "loginController"
            })

            .state("dashboard", {
                url: "/dashboard",
                templateUrl: "./templates/dashboard.html",
                controller: "dashboardController"
            })

            .state("order", {
                url: "/order",
                templateUrl: "./templates/takeOrder.html",
                controller: "orderController"
            })
        $urlRouterProvider.otherwise("/")

        $httpProvider.interceptors.push("httpInterceptor");

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