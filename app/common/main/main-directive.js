'use strict';

angular.module('trackingSystem.common', [])
    .directive('redirect', ['identity', function (identity) {
        return {
            restrict: 'A',
            priority: 100000,
            link: function (scope, element, attrs, controller) {
            }
        }
    }]);