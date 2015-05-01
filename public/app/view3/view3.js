'use strict';

angular.module('myAppRename.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'app/view3/view3.html',
    controller: 'View3Ctrl'
  });
}])



.controller('View3Ctrl', function ($scope, $http) {
    $http({
      method: 'GET',
      url: 'api/categories'
    }).
      success(function (data, status, headers, config) {
        $scope.categories = data;
      }).
      error(function (data, status, headers, config) {
        $scope.error = data;
      });
        $scope.findCategories = function(letter){
            console.log(letter);
            $scope.filteredCategories = $scope.categories.filter(function(item){
                if(item != null && item.charAt(0) == letter){
                   return true;
                }
                else{
                    return false;
                }
            })
        }
});



