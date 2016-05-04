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
                            return $q.reject('not logged in');
                        }

                        return $q.when(true);
                    }],
                administrator: [
                    '$q',
                    'identity',
                    function ($q, identity) {
                        var deferred = $q.defer();
                        identity.getUser()
                            .then(function (response) {
                                if (!response.isAdmin) {
                                    deferred.reject('not authorized');
                                }

                                deferred.resolve(true);
                            });

                        return deferred.promise;
                    }
                ],
                user: [
                    'authentication',
                    function (authentication) {
                        return authentication.getIdentity();
                    }
                ],
                userValidation: [
                    '$injector',
                    function ($injector) {
                        var authPromise = $injector.invoke(routeResolvers.authenticated);
                        return authPromise;
                    }],
                adminValidation: [
                    '$injector',
                    function ($injector) {
                        var authPromise = $injector.invoke(routeResolvers.administrator);
                        return authPromise;
                    }],
                canEditIssue: [
                    '$q',
                    '$location',
                    'authentication',
                    'issuesDetailsData',
                    'projectDetailsData',
                    function ($q, $location, authentication, issuesDetailsData, projectDetailsData) {
                        var deferred = $q.defer();
                        authentication.getIdentity()
                            .then(function (userData) {
                                var user = userData.data;
                                if (user.isAdmin) {
                                    deferred.resolve(true);
                                } else {
                                    var issueId = $location.$$path.match(/\/(\d+)\//)[1];
                                    issuesDetailsData.getIssuesById(issueId)
                                        .then(function (issueData) {
                                            var issue = issueData.data;
                                            if (issue.Assignee.Id === user.Id || issue.Author.Id === user.Id) {
                                                deferred.resolve(true);
                                            } else {
                                                projectDetailsData.getProject(issue.Project.Id)
                                                    .then(function (projectData) {
                                                        var project = projectData.data;
                                                        if (project.Lead.Id === user.Id) {
                                                            deferred.resolve(true);
                                                        } else {
                                                            deferred.reject('not authorized');
                                                        }
                                                    })
                                            }
                                        })
                                }
                            });
                        return deferred.promise;
                    }],
                canEditProject: [
                    '$q',
                    '$location',
                    'authentication',
                    'projectDetailsData',
                    function ($q, $location, authentication, projectDetailsData) {
                        var deferred = $q.defer();
                        authentication.getIdentity()
                            .then(function (userData) {
                                var user = userData.data;
                                if (user.isAdmin) {
                                    deferred.resolve(true);
                                } else {
                                    var projectId = $location.$$path.match(/\/(\d+)\//)[1];
                                    projectDetailsData.getProject(projectId)
                                        .then(function (projectData) {
                                            var project = projectData.data;
                                            if (project.Lead.Id === user.Id) {
                                                deferred.resolve(true);
                                            } else {
                                                deferred.reject('not authorized');
                                            }
                                        })
                                }
                            });
                        return deferred.promise;
                    }]

            };

            var routeResolveChecks = {
                dashboard: {},
                addProject: {
                    userValidation: routeResolvers.userValidation,
                    adminValidation: routeResolvers.adminValidation
                },
                listAllProjects: {
                    userValidation: routeResolvers.userValidation,
                    adminValidation: routeResolvers.adminValidation
                },
                view: {
                    userValidation: routeResolvers.userValidation
                },
                editProject: {
                    userValidation: routeResolvers.userValidation,
                    canEditProject: routeResolvers.canEditProject
                    // adminValidation: routeResolvers.adminValidation
                },
                editIssue: {
                    userValidation: routeResolvers.userValidation,
                    canEditIssue: routeResolvers.canEditIssue
                },
                addIssue: {
                    userValidation: routeResolvers.userValidation,
                    canEditProject: routeResolvers.canEditProject
                },
                changePass: {
                    userValidation: routeResolvers.userValidation
                }
            };

            return {
                $get: function () {
                    return routeResolveChecks;
                }
            }
        }]);