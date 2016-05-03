'use strict';

angular.module('trackingSystem.common.main-directive', [])
    .directive('redirect', [
        function () {
            return {
                restrict: 'A',
                priority: 100000,
                link: function (scope, element, attrs, controller) {
                }
            }
        }]);