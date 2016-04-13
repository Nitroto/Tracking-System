'use strict';

angular.module('trackingSystem.register', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'app/register/register.html',
    controller: 'RegisterController'
  });
}])

.controller('RegisterController', [function() {

}]);