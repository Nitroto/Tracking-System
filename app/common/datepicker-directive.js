'use strict';

angular.module('trackingSystem.common.datapicker-directive', [])
    .directive('datapicker', [
        function () {
            return {
                restrict: 'A',
                controller: 'DatepickerController',
                templateUrl: 'app/common/datepicker.html',
                priority: 100000,
                scope: {
                    selectedDate: '=date'
                }
            }
        }]);