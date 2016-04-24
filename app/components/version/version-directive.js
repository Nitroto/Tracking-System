'use strict';

angular.module('trackingSystem.version.version-directive', [])
    .directive('trackingVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }]);
