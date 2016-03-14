angular.module("app")

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
