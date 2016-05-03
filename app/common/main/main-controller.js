'use strict';

angular.module('trackingSystem.common.main', [])
    .controller('MainController', [
        '$scope',
        '$location',
        '$route',
        'authentication',
        'identity',
        'notifier',
        function ($scope, $location, $route, authentication, identity, notifier) {
            $scope.currentUser = {
                isAuthenticated: identity.isAuthenticated()
            };

            var waitForLogin = function () {
                identity.getUser()
                    .then(function (user) {
                        $scope.currentUser = user;
                        $scope.currentUser.isAuthenticated = identity.isAuthenticated();
                    });
            };

            waitForLogin();

            $scope.logout = function logout() {
                authentication.logout();
                $scope.currentUser.isAuthenticated = identity.isAuthenticated();
                waitForLogin();
                $location.path('/');
                notifier.success('Logout successful.');
                // $route.reload();
            };

            $scope.search = function (searchTerm) {
                $location.path('/projects/search').search('term', searchTerm);
            };
        }]);
