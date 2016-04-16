'use strict';

angular.module('trackingSystem.users.authentication', [])
    .factory('authentication', [
        '$http',
        '$q',
        '$cookies',
        'BASE_URL',
        'identity',
        function ($http, $q, $cookies, BASE_URL, identity) {
            var TOKEN_KEY = 'TrackingSystemAuth';
            var signup = function (user) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'api/Account/Register', user)
                    .then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            };

            var login = function (user) {
                var deferred = $q.defer();
                var data = 'grant_type=password&username=' + user.email + '&password=' + user.password;
                var config = {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                };

                $http.post(BASE_URL + 'api/Token', data, config)
                    .then(function (response) {
                        var tokenValue = response.data['access_token'];
                        sessionStorage['authToken'] = response.data['access_token'];

                        $http.defaults.headers.common.Authorization = 'Bearer ' + tokenValue;

                        getIdentity().then(function () {
                            deferred.resolve(response);
                        });
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            };

            var getIdentity = function () {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Users/me')
                    .then(function (identityResponse) {
                        identity.setUser(identityResponse.data);
                        deferred.resolve(identityResponse);
                    }, function (error) {
                        deferred.resolve(error);
                    });

                return deferred.promise;
            };

            var isAuthenticated = function () {
                var authentication = !!$cookies.get(TOKEN_KEY);
                if (!authentication) {
                    return !!sessionStorage['authToken'];
                }

                return authentication;
            };

            var logout = function () {
                $cookies.remove(TOKEN_KEY);
                delete sessionStorage['authToken'];
                $http.defaults.headers.common.Authorization = null;
                identity.removeUser();
            };

            return {
                signup: signup,
                login: login,
                logout: logout,
                getIdentity: getIdentity,
                isAuthenticated: isAuthenticated
            }
        }]);