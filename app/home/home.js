'use strict';

angular.module('trackingSystem.home', [])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/home/home.html',
            controller: 'UserController'
        });
    }]);
