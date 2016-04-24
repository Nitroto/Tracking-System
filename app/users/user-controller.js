'use strict';

angular.module('trackingSystem.users', [])
    .controller('UserController', [
        '$scope',
        'userProfileData',
        'authentication',
        'identity',
        'notifier',
        function ($scope, userProfileData, authentication, identity) {
            identity.getUser()
                .then(function (user) {
                    
                })
        }]);
