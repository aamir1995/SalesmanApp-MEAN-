angular.module("app")


    .controller("indexController", function ($rootScope, $scope) {
        $rootScope.headerElements = true;
        // $scope.currentUser = $rootScope.userName;
        // console.log($scope.currentUser, "current user from index controller");
    })

    .controller("loginController", function ($rootScope, $scope, $http, $state) {
        $scope.user = {};

        $scope.login = function () {
            //console.log($scope.user)
          
            $http.post("api/login", { data: $scope.user })
                .success(function (response) {
                    console.log('asd',response)
                    if (response.token) {
                        localStorage.setItem('token', response.token);
                        $rootScope.currentUser = response.userName;
                        $state.go("userProfile");

                    }
                })
                .error(function (err) {
                    console.log("errorr in sign in");
                    console.log(err);
                    $state.go("/login");

                })
        }

    })


    .controller("signupController", function ($scope, $http, $state) {
        $scope.user = {};
        $scope.saveData = function () {
            $http.post("api/signup", { data: $scope.user })

                .success(function (data) {
                    console.log(data);
                    console.log("successfully added (index.js)")
                    $state.go("login");
                })
                .error(function (err) {
                    console.log(err);
                })
        }

    })

    .controller("homeController", function ($scope, $http, $state) {

    })

    .controller("userProfileController", function ($rootScope, $scope, $http, $state) {
        $rootScope.headerElements = false;
        
        
        }

    )
    
    .controller("newCompanyController", function($scope, $http, $state){
        $scope.token = localStorage.getItem("token");
        $scope.companyInfo = {};
        $scope.companyInfo.adminId = $scope.token;
        console.log($scope.companyInfo);
        console.log($scope.companyInfo.adminId);
        
        $scope.createCompany = function(){
        $http.post("api/newCompany", $scope.companyInfo)
            // .success(function(data){
            //     console.log(data + "from newCompanyController");
            //     $state.go($state.current, {}, {reload: true})
                
            // }).error(function(err){
            //    console.log(err);
            // })
            .then(function(data){
                console.log(data + "from newCompanyController");
               $state.go($state.current, {}, {reload: true})
                
            }, function(err){
                console.log(err);
            })
        
        
        }})