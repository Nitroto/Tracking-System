'use strict';

angular.module('trackingSystem.users.data', [])
    .factory('userDetailsData', [
        'data',
        function (data) {
            function getUser() {
                return data.get('Users/me');
            }

            function getAllUsers() {
                return data.get('Users/');
            }

            return {
                getAllUsers: getAllUsers,
                getUser: getUser
            }
        }]);