'use strict';

angular.module('trackingSystem.common.datapicker-directive', [])
    .directive('datapicker', [
        function () {
            return {
                restrict: 'A',
                controller: 'DatepickerController',
                templateUrl: 'app/common/datepicker.html',
                scope: {
                    selectedDate: '=date'
                },
                link: function (scope, el, attr, ctrl) {
                }
            }
        }]);