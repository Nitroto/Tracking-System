'use strict';

angular.module('trackingSystem.common', [])
    .controller('MainController', [
        '$scope',
        '$location',
        '$route',
        'authentication',
        'identity',
        'notifier',
        function ($scope, $location, $route, authentication, identity, notifier) {

            waitForLogin();

            $scope.logout = function logout() {
                authentication.logout();
                $scope.currentUser = undefined;
                waitForLogin();
                $location.path('/');
                notifier.success('Logout successful.');
                $route.reload();
            };

            $scope.search = function (searchTerm) {
                $location.path('/projects/search').search('term', searchTerm);
            };

            function waitForLogin() {
                identity.getUser()
                    .then(function (user) {
                        $scope.currentUser = user;
                    });
            }
        }]);