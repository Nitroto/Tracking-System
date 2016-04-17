'use strict';

angular.module('trackingSystem.user', ['trackingSystem.users.authentication', 'ngCookies'])
    .controller('UserController', [
        '$scope',
        'userProfileData',
        'authentication',
        'identity',
        'notifier',
        function ($scope, userProfileData, authentication, identity, notifier) {
            identity.getUser()
                .then(function (user) {
                    
                })

        }]);
