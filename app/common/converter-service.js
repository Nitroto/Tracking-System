'use strict';

angular.module('trackingSystem.common.converter', [])
    .factory('converter', [
        function () {
            var convertStringToArray = function (str) {
                return str.split(', ')
            };

            var convertArrayToString = function (arr) {
                var names = arr.map(function(item) {
                    return item['Name'];
                });
                return names.join(', ')
            };
            return {
                convertStringToArray: convertStringToArray,
                convertArrayToString: convertArrayToString
            }
        }
    ]);