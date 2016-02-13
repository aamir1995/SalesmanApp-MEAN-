
angular.module("app", ['ui.router', 'ngMaterial', 'ngMdIcons'])

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
            .state("home", {
                url: "/home",
                templateUrl: "/templates/home.html",
                controller: "homeController",

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
                controller: "newCompanyController"
            })
        $urlRouterProvider.otherwise("/");

        $httpProvider.interceptors.push("httpInterceptor");
    })

    .run(function ($rootScope, $state) {



        console.log("runPhase running perfectly");

        $rootScope.$on("$stateChangeStart", function (event, toState, fromState) {
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
            //var token = localStorage.getItem("token");

            $http.get("api/getCompanyInfo")
                .then(function (response) {
                    deferred.resolve(response);

                }, function err(err) {
                    deferred.reject(err);

                })
            return deferred.promise;
        }


    });
    

    