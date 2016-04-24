'use strict';

angular.module('trackingSystem.identity.identity', [])
    .factory('identity', [
        '$q',
        function ($q) {
            var currentUser = {};
            var deferred = $q.defer();

            var getUser = function () {
                if (this.isAuthenticated()) {
                    return $q.resolve(currentUser);
                }

                return deferred.promise;
            };

            var isAuthenticated = function () {
                return Object.getOwnPropertyNames(currentUser).length !== 0;
            };

            var setUser = function (user) {
                currentUser = user;
                deferred.resolve(user);
            };

            var removeUser = function () {
                currentUser = {};
                deferred = $q.defer();
            };

            return {
                getUser: getUser,
                isAuthenticated: isAuthenticated,
                setUser: setUser,
                removeUser: removeUser
            }
        }]);