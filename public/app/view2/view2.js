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
        $scope.items = ['Item 1', 'Item 2', 'Item 3'];

        $scope.addItem = function() {
            var newItemNo = $scope.items.length + 1;
            $scope.items.push('Item ' + newItemNo);
        };
        $scope.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };


  }]);
