angular.module("app")


    .controller("indexController", function ($rootScope, $scope) {
        $rootScope.headerName = "Salesman App";       
        $rootScope.headerElements = true;
      
    })

    .controller("loginController", function ($rootScope, $scope, $http, $state) {
       
        $scope.user = {};

        $scope.login = function () {
            $http.post("api/login", { data: $scope.user })
                .success(function (response) {
                    if (response.token) {
                        localStorage.setItem('token', response.token);
                        $state.go("userProfile");
                    }
                })
                .error(function (err) {
                    console.log("error in sign in");
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

    
    .controller("userProfileController", function ($scope, $rootScope, getCompanyService, getSalesmenInfo, $mdDialog, $mdMedia, $http) {
        
        $http.get("api/getUserDataAgain")
            .success(function (response) {
                console.log(response);
                $rootScope.currentUser = response;
               
            }, function (err) {
                console.log(err);
            });
        
        $scope.ifCompany = true; 
        
        $rootScope.headerElements = false;
        getCompanyService.getCompanyData()
        .then(function (response) {
          $scope.company = response.data;          
            },function(error){
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
         $scope.showAdvanced = function(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: addSalesmenController,
      templateUrl: '../templates/addSalesmen.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
        $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function (wantsFullScreen) {
        $scope.customFullscreen = (wantsFullScreen === true);
    });
  };
  
  function addSalesmenController($rootScope, $http, $scope,  $mdDialog, $state){
      
      $scope.createSalesman = function(){
          $scope.salesman.uniqueId = localStorage.getItem("token");
      $http.post("api/newSalesman", $scope.salesman)
        // .success(function(data){
        //     console.log(data);
        //     $rootScope.companyInfo = data;
        //     //console.log($scope.companyInfo);
        //     $mdDialog.cancel();
        // })
        // .error(function(err){
        //     console.log(err);
        // })
      }
             $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
        }
        
        
        })
        
    
    .controller("newCompanyController", function($scope, $http, $state){
        $scope.token = localStorage.getItem("token");
        $scope.companyInfo = {};
        $scope.companyInfo.adminId = $scope.token;
        console.log($scope.companyInfo);
        console.log($scope.companyInfo.adminId);
        
        $scope.createCompany = function(){
        $http.post("api/newCompany", $scope.companyInfo)
           .then(function(data){
                console.log(data + "from newCompanyController");
               //$state.go($state.current, {}, {reload: true})
               $state.go("userProfile")
                
            }, function(err){
                console.log(err);
            })
                
        }})