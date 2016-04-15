'use strict';

angular.module('trackingSystem.users.identity', [])
    .factory('identity', [
        '$http',
        '$q',
        'BASE_URL',

        function ($http, $q, BASE_URL) {

            var deferred = $q.defer();
            var currentUser = undefined;
            var authToken = sessionStorage['authToken'];
            $http.defaults.headers.common.Authorization = 'Bearer ' + authToken;

            $http.get(BASE_URL + 'Users/me')
                .then(function (success) {
                    currentUser = success.data;
                    deferred.resolve(currentUser);
                }, function (error) {
                    deferred.resolve(error);
                });

            return {
                getCurrentUser: function () {
                    if (currentUser) {
                        return $q.when(currentUser);
                    }
                    else {
                        return deferred.promise;
                    }
                }
            }

        }]);