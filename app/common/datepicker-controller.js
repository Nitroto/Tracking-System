'use strict';

angular.module('trackingSystem.common.datapicker-controller', [])
    .controller('DatepickerController', [
        '$scope',
        function ($scope) {
            // Datepicker
            $scope.dateOptions = {
                // dateDisabled: disabled,
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1
            };

            $scope.datepicker = {
                opened: false
            };

            $scope.openDatepicker = function () {
                $scope.datepicker.opened = true;
            };

            $scope.setDate = function (year, month, day) {
                $scope.selectedDate = new Date(year, month, day);
            };

            // Disable weekend selection
            function disabled(data) {
                var date = data.date,
                    mode = data.mode;
                return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
            }

            $scope.$watch('selectedDate', function (oldVal, newVal) {
            })

        }]);