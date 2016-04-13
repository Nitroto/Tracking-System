'use strict';

angular.module('trackingSystem.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'app/home/home.html',
    controller: 'HomeController'
  });
}])

.controller('HomeController', [function($scope,trackingService, notifyService,pageSize) {
    
}]);