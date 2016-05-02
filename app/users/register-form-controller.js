'use strict';

angular.module('trackingSystem.users.register', [])
    .controller('RegisterFormController', [
        '$scope',
        '$route',
        'authentication',
        'notifier',
        function ($scope, $route, authentication, notifier) {
            $scope.register = function (user) {
                var loginUser = {email: user.email, password: user.password};
                authentication.signup(user)
                    .then(function () {
                        notifier.success('Register Successful.');
                        authentication.login(loginUser);
                        $route.reload();
                    })
            };
        }]);