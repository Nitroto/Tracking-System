'use strict';

angular.module('trackingSystem.profile.change-password', [])
    .controller('ChangePasswordController', [
        '$scope',
        'userDetailsData',
        'notifier',
        function ($scope, userDetailsData, notifier) {
            $scope.changePassword = function (data) {
                if (data.OldPassword === data.NewPassword) {
                    notifier.error('New password can not be the same as old password');
                    $scope.user = {};
                }
                else {
                    userDetailsData.changeUserPassword(data)
                        .then(function (response) {
                            notifier.success('Password changed successful.');
                            $scope.$parent.logout();
                        })
                }
            }
        }
    ]);