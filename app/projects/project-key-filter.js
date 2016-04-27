'use strict';

angular.module('trackingSystem.projects.first-letter-filter', [])
    .filter('extractor', [
        function () {
            return function (input, all) {
                var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/g;
                return (!!input) ? input.replace(reg, function (txt) {
                    return txt.charAt(0).toUpperCase();
                }) : '';
            }
        }]);