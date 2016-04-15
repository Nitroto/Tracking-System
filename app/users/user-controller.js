'use strict';

angular.module('trackingSystem.user', ['trackingSystem.users.authentication', 'ngCookies'])
    .controller('UserController', [
        '$scope',
        '$location',
        '$route',
        '$cookies',
        'authentication',
        'growl',
        function ($scope, $location, $route, $cookies, authentication, growl) {
            $scope.login = function (user) {
                authentication.loginUser(user)
                    .then(function (loginUser) {
                        $route.reload();
                        growl.success('Login Successful.');
                        sessionStorage['authToken'] = loginUser.data['access_token'];
                        if (user.remember) {
                            $cookies.put('TrackingSystemAuth', loginUser.data['access_token'], {
                                expires: loginUser.data['.expires']
                            });
                        }
                    }, function (error) {
                        growl.error('Failed to login. Wrong email or password.');
                    });
            };

            $scope.register = function (user) {
                var loginUser = {email: user.email, password: user.password};
                authentication.registerUser(user)
                    .then(function () {
                        growl.success('Register Successful.');
                        $scope.login(loginUser);
                    }, function (err) {
                        growl.error('Failed to register. I can tell you more if the backend was more talkative.');
                    })
            };

            $scope.logout = function () {
                delete sessionStorage['authToken'];
                $cookies.remove('TrackingSystemAuth');
                growl.success('Logout Successful.');
                $location.path('/');
            };

            $scope.loggedUser = !!sessionStorage['authToken'];
        }]);
