'use strict';

angular.module('trackingSystem.user.login', [])
    .controller('LoginFormController', [
        '$scope',
        '$cookies',
        '$route',
        'authentication',
        'notifier',
        function ($scope, $cookies, $route, authentication, notifier) {
            $scope.login = function (user) {
                authentication.login(user)
                    .then(function (loginUser) {
                        $route.reload();
                        notifier.success('Login Successful.');
                        if (user.remember) {
                            $cookies.put('TrackingSystemAuth', loginUser.data['access_token'], {
                                expires: loginUser.data['.expires']
                            });
                        }
                    }, function (error) {
                        notifier.error('Failed to login. Wrong email or password.');
                    });
            };
        }]);