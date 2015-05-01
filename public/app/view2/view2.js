'use strict';

angular.module('myAppRename.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'app/view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl',['$scope','$http', function($scope,$http) {
$scope.getWiki = function(wiki){
    $http({ url: 'api/findWiki/' + wiki, method: 'GET'})
        .success(function (data, status, headers, config) {
            $scope.wikis = data;
        }).
        error(function (data, status, headers, config) {
            $scope.error = data;
        });
}




  }]);
