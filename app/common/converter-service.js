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

            var textToAbbreviation = function (input, all) {
                var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/g;
                return (!!input) ? input.replace(reg, function (txt) {
                    return txt.charAt(0).toUpperCase();
                }) : '';
            };

            return {
                convertStringToArray: convertStringToArray,
                convertArrayToString: convertArrayToString,
                textToAbbreviation: textToAbbreviation
            }
        }
    ]);