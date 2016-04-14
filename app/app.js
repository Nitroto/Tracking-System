'use strict';

// Declare app level module which depends on views, and components
angular.module('trackingSystem', [
        'ngRoute',
        'ngAnimate',
        'angular-growl',
        'ui.router',
        'ui.bootstrap',
        'trackingSystem.home',
        'trackingSystem.users.identify',
        'trackingSystem.version'
    ]).constant({
        "BASE_URL": 'http://softuni-issue-tracker.azurewebsites.net/'
    }).config(['$routeProvider', 'growlProvider', function ($routeProvider, growlProvider) {
        $routeProvider.otherwise(
            {redirectTo: '/'}
        );
        growlProvider.globalTimeToLive(5000);
        growlProvider.globalInlineMessages(true);
    }]);
// .run(function ($rootScope, $location, identify) {
//     $rootScope.$on('$locationChangeStart', function (event) {
//         if ($location.path().indexOf("/user/") != -1 && !identify.isLoggedIn()) {
//             $location.path('/login');
//         }
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