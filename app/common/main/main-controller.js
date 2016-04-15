'use strict';

angular.module('trackingSystem.common', [])
    .controller('MainController', [
        '$scope',
        '$http',
        'identity',
        function ($scope, $http, identity) {
            var user = {};
            user.role = 'guest';

            identity.getCurrentUser()
                .then(function (loggedUser) {
                    if (loggedUser.status == 200) {
                        if (loggedUser.isAdmin) {
                            user.role = 'admin';
                        } else {
                            user.role = 'user';
                        }
                    }
                    $scope.user = user;
                });
        }]);