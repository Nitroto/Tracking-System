'use strict';

// Declare app level module which depends on views, and components
angular.module('trackingSystem', [
    'ngRoute',
    'ngAnimate',
    'angular-growl',
    'ui.router',
    'ui.bootstrap',
    'trackingSystem.common',
    'trackingSystem.common.navigation-directive',
    'trackingSystem.common.footer-directive',
    'trackingSystem.common.notifier-service',
    'trackingSystem.home.admin',
    'trackingSystem.home.user',
    'trackingSystem.user',
    'trackingSystem.user.login',
    'trackingSystem.user.register',
    'trackingSystem.users.identity',
    'trackingSystem.version'
]).constant({
    "BASE_URL": 'http://softuni-issue-tracker.azurewebsites.net/'
}).config(['$routeProvider', 'growlProvider', function ($routeProvider, growlProvider) {
    growlProvider.globalTimeToLive(5000);
    growlProvider.globalInlineMessages(true);

    $routeProvider
        .when('/', {
            templateUrl: 'app/common/main/main-layout.html',
            controller: 'MainController'
        })
        .when('/projects/add', {//admin only
            templateUrl: 'app/home/user-dashboard.html',
            // controller: 'HomePageController'
        })
        .when('/projects/:id', {
            templateUrl: 'app/home/user-dashboard.html',
            // controller: 'HomePageController'
        })
        .when('/projects/:id/edit', {
            templateUrl: 'app/home/user-dashboard.html',
            // controller: 'HomePageController'
        })
        .when('/projects/:id/add-issue', {
            templateUrl: 'app/home/user-dashboard.html',
            // controller: 'HomePageController'
        })
        .when('/issues/:id', {
            templateUrl: 'app/home/user-dashboard.html',
            // controller: 'HomePageController'
        })
        .when('/issues/:id/edit', {
            templateUrl: 'app/home/user-dashboard.html',
            // controller: 'HomePageController'
        })
        .when('/profile/password', {
            templateUrl: 'app/home/user-dashboard.html',
            // controller: 'HomePageController'
        })
        .when('/logout', {
            templateUrl: 'app/common/main/main-layout.html',
            // controller: 'HomePageController'
        }).when('/notfound', {
            templateUrl: 'app/home/user-dashboard.html'
        })
        .otherwise(
            {redirectTo: '/notfound'}
        );
}]).run(function ($rootScope, $location, authentication, notifier) {
    $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
        if (rejection === 'not authorized') {
            notifier.warning('Please log in first.');
            $location.path('/');
        }
    });

    if (authentication.isAuthenticated()) {
        authentication.getIdentity()
            .then(function (identify) {
                notifier.success('Welcome back, ' + identify.data['Username'] + '!');
            });
    }

    // $rootScope.$on('$locationChangeStart', function (event) {
    //     if ($location.path().indexOf("/admin/") != -1 && !identify.isAdmin()) {
    //         $location.path('/login');
    //     } else if (($location.path().indexOf('/user') != -1) && identify.isAdmin()) {
    //         $location.path('/admin/home')
    //     }
    // })
});