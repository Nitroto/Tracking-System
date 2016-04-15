'use strict';

angular.module('trackingSystem.users.authentication', [])
    .factory('authentication', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {

            function signup(user) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'api/Account/Register', user)
                    .then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function login(user) {
                var deferred = $q.defer();
                var data = 'grant_type=password&username=' + user.email + '&password=' + user.password;
                var config = {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                };

                $http.post(BASE_URL + 'api/Token', data, config)
                    .then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function logout() {
                
            }

            return {
                registerUser: signup,
                loginUser: login,
                logout: logout
            }
        }]);