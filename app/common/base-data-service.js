'use strict';

angular.module('trackingSystem.common.data-service', [])
    .factory('data', [
        '$http',
        '$q',
        'notifier',
        'identity',
        'BASE_URL',
        function ($http, $q, notifier, identity, BASE_URL) {
            var config = {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                },
                authorizationErrorMessage = 'You must be logged in to do that';

            // var tokenValue = sessionStorage['authToken'];
            //
            // $http.defaults.headers.common.Authorization = 'Bearer ' + tokenValue;

            function get(url, authorize) {
                var deferred = $q.defer();

                if (authorize && !identity.isAuthenticated()) {
                    notifier.error(authorizationErrorMessage);
                    deferred.reject();
                } else {
                    var URL = BASE_URL + url;

                    $http.get(URL)
                        .then(function (data) {
                            deferred.resolve(data);
                        }, function (error) {
                            deferred.reject(error);
                        })
                }

                return deferred.promise;
            }

            function post(url, data, authorize) {
                var deferred = $q.defer();

                if (authorize && !identity.isAuthenticated()) {
                    notifier.error(authorizationErrorMessage);
                    deferred.reject();
                } else {
                    var URL = BASE_URL + url;

                    $http.post(URL, data, config)
                        .then(function (data) {
                            deferred.resolve(data);
                        }, function (error) {
                            deferred.reject(error);
                        })
                }

                return deferred.promise;
            }

            return {
                get: get,
                post: post
            }
        }
    ]);