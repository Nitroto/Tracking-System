'use strict';

angular.module('trackingSystem.common.converter', [])
    .factory('converter', [
        function () {
            var convertStringToArray = function (str) {
                var arr = [];
                var words = str.split(/,\s?|;|,|\./);
                words.forEach(function (word) {
                    arr.push({Name: word});
                });

                return arr;
            };

            var convertArrayToString = function (arr) {
                var names = arr.map(function (item) {
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