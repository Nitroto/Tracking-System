'use strict';

angular.module('trackingSystem.common.navigation-directive', [])
    .directive('navigation', [
        function () {
            return {
                restrict: 'A',
                replace: true,
                templateUrl: 'app/common/navigation/navigation-bar.html'
            }
        }]);