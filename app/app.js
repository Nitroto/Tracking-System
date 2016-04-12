'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('trackingSystem', [
        'ngRoute',
        'trackingSystem.home',
        'trackingSystem.login',
        'trackingSystem.version'
    ]).constant("myConfig", {
        'baseServiceUrl': 'http://softuni-issue-tracker.azurewebsites.net',
        "port": "80"
    }).config(['$routeProvider', function ($routeProvider) {
        // $routeProvider.when('/',{
        //     templateUrl: 'app/home/home.html',
        //     controller:'HomeController'
        // });
        //
        // $routeProvider.when('/login',{
        //     templateUrl: 'app/login',
        //     controller:'LoginController'
        // });
        //
        // $routeProvider.when('/register',{
        //     templateUrl: 'app/register',
        //     controller:'RegisterController'
        // });

        $routeProvider.otherwise(
            {redirectTo: '/'}
        );
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