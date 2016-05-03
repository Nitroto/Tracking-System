'use strict';

// Declare app level module which depends on views, and components
angular.module('trackingSystem', [
        'ngRoute',
        'ngAnimate',
        'ngSanitize',
        'ngCookies',
        'angular-growl',
        'angular-loading-bar',
        'ui.router',
        'ui.bootstrap',
        'ui.bootstrap.validation',
        'initialValue',
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
        'growlProvider',
        'routeResolversProvider',
        function ($routeProvider, $httpProvider, growlProvider, routeResolversProvider) {
            growlProvider.globalTimeToLive(5000);
            growlProvider.globalInlineMessages(true);

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
                    controller: 'ViewProjectController'
                })
                .when('/projects/:id/edit', {
                    templateUrl: 'app/projects/edit-project.html',
                    controller: 'EditProjectController'
                })
                .when('/projects/:id/add-issue', {
                    templateUrl: 'app/issues/add-issue.html',
                    controller: 'AddIssueController'
                })
                .when('/issues/:id', {
                    templateUrl: 'app/issues/view-issue.html',
                    controller: 'ViewIssueController'
                })
                .when('/issues/:id/edit', {
                    templateUrl: 'app/issues/edit-issue.html',
                    controller: 'EditIssueController'
                })
                .when('/profile/password', {
                    templateUrl: 'app/profile/change-password.html',
                    controller: 'ChangePasswordController'
                })
                .when('/logout', {
                    templateUrl: 'app/common/main/main-layout.html',
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
        }]);