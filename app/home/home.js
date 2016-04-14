'use strict';

angular.module('trackingSystem.home', ['trackingSystem.users.authentication', 'ngCookies'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/home/home.html',
            controller: 'HomeController'
        });
    }])

    .controller('HomeController', [
        '$scope',
        '$location',
        '$route',
        '$cookies',
        'authentication',
        'growl',
        function ($scope, $location, $route, $cookies, authentication, growl) {
            $scope.login = function (user) {
                console.log(user);
                authentication.loginUser(user)
                    .then(function (loginUser) {
                        $route.reload();
                        growl.success('Login Successful.');
                        sessionStorage['authToken'] = loginUser.data['access_token'];
                        if (user.remember) {
                            $cookies.put('token', loginUser.data['access_token']);
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
                        console.log(err);
                        growl.error('Failed to register. I can tell you more if the backend was more talkative.');
                    })
            }
        }]);
