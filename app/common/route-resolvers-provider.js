'use strict';

angular.module('trackingSystem.common.route-resolvers', [])
    .provider('routeResolvers', [
        function () {
            var routeResolvers = {
                authenticated: [
                    '$q',
                    'authentication',
                    function ($q, authentication) {
                        if (!authentication.isAuthenticated()) {
                            return $q.reject('not authorized');
                        }

                        return $q.when(true);
                    }],
                userIssues: [
                    'issuesDetailsData',
                    function (issuesDetailsData) {
                        return issuesDetailsData.getUserIssues();
                    }
                ],
                userLeadProjects: [
                    'projectDetailsData',
                    function (projectDetailsData) {
                        return projectDetailsData.getProjectsByFilter();
                    }
                ],
                userAssignedProjects: [
                    'issuesDetailsData',
                    function (issuesDetailsData) {
                        return issuesDetailsData.getIssuesByFilter();
                    }
                ],
                userValidation: [
                    '$injector',
                    function ($injector) {
                        var authPromis = $injector.invoke(routeResolvers.authenticated);
                        return authPromis;
                    }]
            };

            var routeResolveChecks = {
                dashboard: {

                },
                addProject: {
                    userValidation: routeResolvers.userValidation
                },
                listAllProjects: {
                    userValidation: routeResolvers.userValidation
                }
            };

            return {
                $get: function () {
                    return routeResolveChecks;
                }
            }
        }]);