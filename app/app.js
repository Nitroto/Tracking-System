'use strict';

// Declare app level module which depends on views, and components
angular.module('trackingSystem', [
        'ngRoute',
        'ngAnimate',
        'ngSanitize',
        'ngCookies',
        // 'permission',
        'angular-growl',
        'angular-loading-bar',
        // 'ui.router',
        'ui.bootstrap',
        'ui.bootstrap.validation',
        // 'initialValue',
        'MassAutoComplete',
        'trackingSystem.common.main',
        'trackingSystem.common.navigation-directive',
        'trackingSystem.common.footer-directive',
        'trackingSystem.common.notifier-service',
        'trackingSystem.common.data-service',
        'trackingSystem.common.converter',
        'trackingSystem.common.return-back',
        'trackingSystem.common.datapicker-controller',
        'trackingSystem.common.datapicker-directive',
        'trackingSystem.common.http-response-interceptor',
        'trackingSystem.common.multi-autocomplete-directive',
        'trackingSystem.common.route-resolvers',
        'trackingSystem.identity.authentication',
        'trackingSystem.identity.identity',
        'trackingSystem.issues.issue-filter',
        'trackingSystem.users',
        'trackingSystem.users.login',
        'trackingSystem.users.register',
        'trackingSystem.users.data',
        'trackingSystem.users.user-issues-directive',
        'trackingSystem.users.user-assigned-projects-directive',
        'trackingSystem.users.user-lead-projects-directive',
        'trackingSystem.profile.change-password',
        'trackingSystem.projects.all',
        'trackingSystem.projects.project-view',
        'trackingSystem.projects.add',
        'trackingSystem.projects.edit',
        'trackingSystem.projects.data-service',
        'trackingSystem.projects.first-letter-filter',
        'trackingSystem.issues.data-service',
        'trackingSystem.issues.issue-view',
        'trackingSystem.issue.add',
        'trackingSystem.issue.edit',
        'trackingSystem.comments.data-service',
        'trackingSystem.labels.data-service',
        'trackingSystem.version'
    ])
    .constant({
        'BASE_URL': 'http://softuni-issue-tracker.azurewebsites.net/',
        'pageSize': 20
    })
    .config([
        '$routeProvider',
        '$httpProvider',
        'routeResolversProvider',
        function ($routeProvider, $httpProvider, routeResolversProvider) {

            var routeResolveChecks = routeResolversProvider.$get();

            $routeProvider
                .when('/', {
                    templateUrl: 'app/common/main/main-layout.html',
                    controller: 'MainController'
                    // resolve: routeResolveChecks.dashboard
                })
                .when('/projects', {//admin only
                    templateUrl: 'app/projects/all-projects.html',
                    controller: 'AllProjectsController',
                    resolve: routeResolveChecks.listAllProjects
                })
                .when('/projects/add', {//admin only
                    templateUrl: 'app/projects/add-project.html',
                    controller: 'AddProjectController',
                    resolve: routeResolveChecks.addProject
                })
                .when('/projects/:id', {
                    templateUrl: 'app/projects/view-project.html',
                    controller: 'ViewProjectController',
                    resolve: routeResolveChecks.view
                })
                .when('/projects/:id/edit', {
                    templateUrl: 'app/projects/edit-project.html',
                    controller: 'EditProjectController',
                    resolve: routeResolveChecks.editProject
                })
                .when('/projects/:id/add-issue', {
                    templateUrl: 'app/issues/add-issue.html',
                    controller: 'AddIssueController',
                    resolve: routeResolveChecks.addIssue
                })
                .when('/issues/:id', {
                    templateUrl: 'app/issues/view-issue.html',
                    controller: 'ViewIssueController',
                    resolve: routeResolveChecks.view
                })
                .when('/issues/:id/edit', {
                    templateUrl: 'app/issues/edit-issue.html',
                    controller: 'EditIssueController',
                    resolve: routeResolveChecks.editIssue

                })
                .when('/profile/password', {
                    templateUrl: 'app/profile/change-password.html',
                    controller: 'ChangePasswordController',
                    resolve: routeResolveChecks.changePass
                }).when('/notfound', {
                    templateUrl: 'app/notfound/page-not-found.html'
                })
                .otherwise(
                    {redirectTo: '/notfound'}
                );

            $httpProvider.interceptors.push('httpResponseInterceptor');
        }])
    .run([
        '$rootScope',
        '$location',
        'authentication',
        'notifier',
        function ($rootScope, $location, authentication, notifier) {
            $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
                if (rejection === 'not logged in') {
                    notifier.warning('Please log in first.');
                    $location.path('/');
                }

                if (rejection === 'not authorized') {
                    notifier.warning('Access denied.');
                    $location.path('/');
                }
            });

            $rootScope.$on('$stateChangeStart', function (event, to, toParams, from, fromParams) {
                console.log(event);
            });

            if (authentication.isAuthenticated()) {
                authentication.getIdentity()
                    .then(function (identify) {
                        notifier.success('Welcome back, ' + identify.data['Username'] + '!');
                    });
            }
        }]);