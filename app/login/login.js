'use strict';

angular.module('trackingSystem.login', ['ngRoute','angular-growl'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'app/login/login.html',
            controller: 'LoginController'
        });
    }])

    .controller('LoginController', ['$scope', 'growl', function ($scope, growl) {
        $scope.login = function () {
            growl.addSuccessMessage("I work!");
            growl.addErrorMessage("And I work!");
        }
    }]);