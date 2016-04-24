'use strict';

angular.module('trackingSystem.common.return-back', [])
    .directive('back', ['$window', function ($window) {
        return {
            restrict: 'A',
            link: function (scope, elem) {
                elem.bind('click', function () {
                    $window.history.back();
                });
            }
        };
    }]);