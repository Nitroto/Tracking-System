'use strict';

// Declare app level module which depends on views, and components
angular.module('trackingSystem', [
    'ngRoute',
    'ngAnimate',
    'angular-growl',
    'ui.router',
    'ui.bootstrap',
    'trackingSystem.common',
    'trackingSystem.home',
    'trackingSystem.user',
    'trackingSystem.user.login',
    'trackingSystem.user.register',
    'trackingSystem.users.identity',
    'trackingSystem.common.header-directive',
    'trackingSystem.common.footer-directive',
    'trackingSystem.version'
]).constant({
    "BASE_URL": 'http://softuni-issue-tracker.azurewebsites.net/'
}).config(['$routeProvider', '$locationProvider', 'growlProvider', function ($routeProvider, $locationProvider, growlProvider) {
    growlProvider.globalTimeToLive(5000);
    growlProvider.globalInlineMessages(true);
    $routeProvider
        .when('/', {
            templateUrl: 'app/home/home-page.html',
            // controller: 'HomePageController'
        })
        .when('/projects/add', {//admin only
            templateUrl: 'app/home/home-page.html',
            // controller: 'HomePageController'
        })
        .when('/projects/:id', {
            templateUrl: 'app/home/home-page.html',
            // controller: 'HomePageController'
        })
        .when('/projects/:id/edit', {
            templateUrl: 'app/home/home-page.html',
            // controller: 'HomePageController'
        })
        .when('/projects/:id/add-issue', {
            templateUrl: 'app/home/home-page.html',
            // controller: 'HomePageController'
        })
        .when('/issues/:id', {
            templateUrl: 'app/home/home-page.html',
            // controller: 'HomePageController'
        })
        .when('/issues/:id/edit', {
            templateUrl: 'app/home/home-page.html',
            // controller: 'HomePageController'
        })
        .when('/profile/password', {
            templateUrl: 'app/home/home-page.html',
            // controller: 'HomePageController'
        })
        .when('/logout', {
            templateUrl: 'app/home/home-page.html',
            // controller: 'HomePageController'
        }).when('/notfound', {
            templateUrl: 'app/home/home-page.html'
        })
        .otherwise(
            {redirectTo: '/notfound'}
        );
}]);
// .run(function ($rootScope, $location, identify) {
//     $rootScope.$on('$locationChangeStart', function (event) {
//
//     });
//
//     $rootScope.$on('$locationChangeStart', function (event) {
//         if ($location.path().indexOf("/admin/") != -1 && !identify.isAdmin()) {
//             $location.path('/login');
//         } else if (($location.path().indexOf('/user') != -1) && identify.isAdmin()) {
//             $location.path('/admin/home')
//         }
//     })
// });