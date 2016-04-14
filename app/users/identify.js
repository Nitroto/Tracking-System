'use strict';

angular.module('trackingSystem.users.identify', [])
    .factory('identify', [
        '$http',
        '$q',
        'BASE_URL',

        function ($http, $q, BASE_URL) {
            function getCurrentUser() {
                var deferred = $q.defer();
                var authToken = sessionStorage['authToken'];
                $http.defaults.header.common.Authorization = 'Bearer ' + authToken;

                $http.get(BASE_URL + '/Users/me')
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.resolve(error);
                    });

                return deferred.promise;
            }

            function isAnonymous() {
                return sessionStorage['authToken'] == undefined;
            }

            function isLoggedIn() {
                return sessionStorage['authToken'] != undefined;
            }

            function isNormalUser() {
                getCurrentUser().then(function (user) {
                    return !user.isAdmin;
                });
            }

            function isAdmin() {
                getCurrentUser().then(function (user) {
                    return user.isAdmin;
                })
            }

            return {
                isAnonymous: isAnonymous,
                isLoggedIn: isLoggedIn,
                isNormalUser: isNormalUser,
                isAdmin: isAdmin
            }
        }

    ]);