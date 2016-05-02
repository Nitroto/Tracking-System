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

            function getUserByFilter(filter) {
                return data.get('Users/?filter=' + filter);
            }

            function makeUserAdmin(userId) {
                return data.put('Users/makeadmin', userId)
            }

            function changeUserPassword(userData) {
                return data.post('api/Account/ChangePassword', userData)
            }

            return {
                getAllUsers: getAllUsers,
                getUser: getUser,
                getUserByFilter: getUserByFilter,
                makeUserAdmin: makeUserAdmin,
                changeUserPassword: changeUserPassword
            }
        }]);