'use strict';

angular.module('trackingSystem.user.register', [])
    .controller('RegisterFormController', [
        '$scope',
        'authentication',
        'growl',
        function ($scope, authentication, growl) {
            $scope.register = function (user) {
                // var loginUser = {email: user.email, password: user.password};
                authentication.signup(user)
                    .then(function () {
                        growl.success('Register Successful.');
                        // $scope.login(loginUser);
                    }, function (error) {
                        growl.error('Failed to register. I can tell you more if the backend was more talkative.');
                    })
            };
        }]);