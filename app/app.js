'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('trackingSystem', [
        'ngRoute',
        'ngAnimate',
        'angular-growl',
        'trackingSystem.home',
        'trackingSystem.login',
        'trackingSystem.register',
        'trackingSystem.version'
    ]).constant("myConfig", {
        'baseServiceUrl': 'http://softuni-issue-tracker.azurewebsites.net',
        "port": "80"
    }).config(['$routeProvider','growlProvider', function ($routeProvider,growlProvider) {
        $routeProvider.otherwise(
            {redirectTo: '/'}
        );
        growlProvider.globalTimeToLive(5000);
    }]);

// app.run(function ($rootScope, $location, authService) {
//     $rootScope.$on('$locationChangeStart', function (event) {
//         if ($location.path().indexOf("/user/") != -1 && !authService.isLoggedIn()) {
//             $location.path('/login');
//         }
//     });
//
//     $rootScope.$on('$locationChangeStart', function (event) {
//         if ($location.path().indexOf("/admin/") != -1 && !authService.isAdmin()) {
//             $location.path('/login');
//         } else if (($location.path().indexOf('/user/') != -1) && authService.isAdmin()) {
//             $location.path('/admin/home')
//         }
//     })
// });