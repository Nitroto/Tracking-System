'use strict';

angular.module('trackingSystem.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'app/login/login.html',
    controller: 'LoginController'
  });
}])

.controller('LoginController', [function() {

}]);