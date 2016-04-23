'use strict';

// Declare app level module which depends on views, and components
angular.module('trackingSystem', [
        'ngRoute',
        'ngAnimate',
        'angular-growl',
        'angular-loading-bar',
        'ui.bootstrap',
        'ui.bootstrap.validation',
        'trackingSystem.common',
        'trackingSystem.common.navigation-directive',
        'trackingSystem.common.footer-directive',
        'trackingSystem.common.notifier-service',
        'trackingSystem.common.data-service',
        'trackingSystem.dashboard',
        'trackingSystem.dashboard.admin',
        'trackingSystem.dashboard.user',
        'trackingSystem.user',
        'trackingSystem.user.login',
        'trackingSystem.user.register',
        'trackingSystem.users.identity',
        'trackingSystem.users.data',
        'trackingSystem.projects.all',
        'trackingSystem.projects.project-view',
        'trackingSystem.projects.add',
        'trackingSystem.projects.edit',
        'trackingSystem.projects.data-service',
        'trackingSystem.issues.data-service',
        'trackingSystem.issues.issue-view',
        'trackingSystem.version'
    ])
    .constant({
        'BASE_URL': 'http://softuni-issue-tracker.azurewebsites.net/',
        'pageSize': 20
    })
    .config(['$routeProvider', 'growlProvider', function ($routeProvider, growlProvider) {
        growlProvider.globalTimeToLive(5000);
        growlProvider.globalInlineMessages(true);

        $routeProvider
            .when('/', {
                templateUrl: 'app/common/main/main-layout.html',
                controller: 'MainController'
            })
            .when('/projects', {//admin only
                templateUrl: 'app/projects/all-projects.html',
                controller: 'AllProjectsController'
            })
            .when('/projects/add', {//admin only
                templateUrl: 'app/projects/add-project.html',
                controller: 'AddProjectController'
            })
            .when('/projects/:id', {
                templateUrl: 'app/projects/view-project.html',
                controller: 'ViewProjectController'
            })
            .when('/projects/:id/edit', {
                templateUrl: 'app/projects/edit-project.html',
                controller: 'EditProjectController'
            })
            .when('/projects/:id/add-issue', {
                templateUrl: 'app/issues/add-issue.html',
                // controller: 'HomePageController'
            })
            .when('/issues/:id', {
                templateUrl: 'app/issues/view-issue.html',
                controller: 'ViewIssueController'
            })
            .when('/issues/:id/edit', {
                templateUrl: 'app/issues/edit-issue.html',
                // controller: 'HomePageController'
            })
            .when('/profile/password', {
                templateUrl: 'app/profile/change-password.html',
                // controller: 'HomePageController'
            })
            .when('/logout', {
                templateUrl: 'app/common/main/main-layout.html',
            }).when('/notfound', {
                templateUrl: 'app/notfound/page-not-found.html'
            })
            .otherwise(
                {redirectTo: '/notfound'}
            );
    }])
    .run(function ($rootScope, $location, authentication, notifier, cfpLoadingBar) {
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
    });