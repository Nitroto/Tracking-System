'use strict';

angular.module('trackingSystem.users.register', [])
    .controller('RegisterFormController', [
        '$scope',
        'authentication',
        'notifier',
        function ($scope, authentication, notifier) {
            $scope.register = function (user) {
                var loginUser = {email: user.email, password: user.password};
                authentication.signup(user)
                    .then(function () {
                        notifier.success('Register Successful.');
                        authentication.login(loginUser);
                    }, function (error) {
                        notifier.error(error.data.Message);
                    })
            };
        }]);