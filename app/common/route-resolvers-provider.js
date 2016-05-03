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
                    adminValidation: routeResolvers.adminValidation
                },
                editIssue: {
                    userValidation: routeResolvers.userValidation,
                    adminValidation: routeResolvers.adminValidation
                },
                addIssue:{
                    userValidation: routeResolvers.userValidation,
                    adminValidation: routeResolvers.adminValidation
                },
                changePass:{
                    userValidation: routeResolvers.userValidation
                }
            };

            return {
                $get: function () {
                    return routeResolveChecks;
                }
            }
        }]);