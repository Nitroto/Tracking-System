'use strict';

angular.module('trackingSystem.user.register', [])
    .controller('RegisterFormController', [
        '$scope',
        'authentication',
        'notifier',
        function ($scope, authentication, notifier) {
            $scope.register = function (user) {
                // var loginUser = {email: user.email, password: user.password};
                authentication.signup(user)
                    .then(function () {
                        notifier.success('Register Successful.');
                        // $scope.login(loginUser);
                    }, function (error) {
                        notifier.error('Failed to register. I can tell you more if the backend was more talkative.');
                    })
            };
        }]);