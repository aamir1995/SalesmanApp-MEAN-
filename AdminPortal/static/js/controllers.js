angular.module("app")


    .controller("indexController", function ($rootScope, $scope) {
    //   $scope.toast = function (){
    //       toastService.showSimpleToast()
    //   }
      
      
       
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

    
    .controller("userProfileController", function ($scope, $rootScope, getCompanyService, getSalesmenInfo, $mdDialog, $mdMedia, $http) {
       
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
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function (wantsFullScreen) {
        $scope.customFullscreen = (wantsFullScreen === true);
    });
  };
  
  function addSalesmenController($rootScope, $http, $scope,  $mdDialog, $state, toastService){
      
      $scope.createSalesman = function(){
          $scope.salesman.uniqueId = localStorage.getItem("token");
      $http.post("api/newSalesman", $scope.salesman)
        .success(function(){
        toastService.showSimpleToast()
            $mdDialog.hide();
            $state.go($state.current, {}, {reload: true})

        })
      }
             $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
        }
        
        
            //add Product Button code
         $scope.addProduct = function(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: addProductController,
      templateUrl: '../templates/addProduct.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function (wantsFullScreen) {
        $scope.customFullscreen = (wantsFullScreen === true);
    });
  };
  
   
  function addProductController($scope,  $mdDialog, $http){
    $scope.product = {
        firebaseToken : localStorage.getItem("token")
    }
      
    $scope.addProduct = function() {
        $http.post("api/addProduct",  $scope.product)
            .success(function (response) {
                console.log(response);
                console.log($scope.product)
            })
            .error(function (err) {
                console.log(err);
            })
    }
    
    
             $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
        }
  
                
        })
        
    
    .controller("newCompanyController", function($scope, $http, $state, toastService){
        $scope.token = localStorage.getItem("token");
        $scope.companyInfo = {};
        $scope.companyInfo.adminId = $scope.token;
        console.log($scope.companyInfo);
        console.log($scope.companyInfo.adminId);
        
        $scope.createCompany = function(){
        $http.post("api/newCompany", $scope.companyInfo)
           .then(function(data){
               toastService.showSimpleToast()
                console.log(data + "from newCompanyController");
               $state.go("userProfile")
                     
            }, function(err){
                console.log(err);
            })
                
        }})