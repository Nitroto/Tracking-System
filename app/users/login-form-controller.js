'use strict';

angular.module('trackingSystem.user.login', [])
    .controller('LoginFormController', [
        '$scope',
        '$cookies',
        '$route',
        'authentication',
        'growl',
        function ($scope, $cookies, $route, authentication, growl) {
            $scope.login = function (user) {
                authentication.login(user)
                    .then(function (loginUser) {
                        $route.reload();
                        growl.success('Login Successful.');
                        if (user.remember) {
                            $cookies.put('TrackingSystemAuth', loginUser.data['access_token'], {
                                expires: loginUser.data['.expires']
                            });
                        }
                    }, function (error) {
                        growl.error('Failed to login. Wrong email or password.');
                    });
            };
        }]);