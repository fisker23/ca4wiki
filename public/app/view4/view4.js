'use strict';

angular.module('myAppRename.view4', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view4', {
            templateUrl: 'app/view4/view4.html',
            controller: 'View4Ctrl'
        });
    }])

    .controller('View4Ctrl',['$scope', function($scope,$http) {
    $scope.text = kage;




    }]);
