'use strict';

angular.module('trackingSystem.common.multi-autocomplete-directive', [])
    .directive('multiAutocomplete', [
        '$q',
        'labelsDetailsData',
        function ($q, labelsDetailsData) {
            return {
                restrict: 'A',
                templateUrl: 'app/common/multi-autocomplete.html',
                priority: 100000,
                scope: {
                    userInput: '=data'
                },
                link: function (scope) {
                    scope.ac_container_options = {
                        debounce_position: 500,
                        debounce_suggest: 200
                    };

                    var suggestLabelRemoteAndDelimited = function (term) {
                        var ix = term.lastIndexOf(','),
                            lhs = term.substring(0, ix + 1),
                            rhs = term.substring(ix + 1),
                            deferred = $q.defer();


                        deferred.resolve(labelsDetailsData.getFilteredComments(rhs)
                            .then(function (response) {
                                var labels = response.data;
                                var result = [];
                                labels.forEach(function (l) {
                                    result.push({label: l.Name, value: lhs + l.Name});
                                });

                                return result;
                            }));

                        return deferred.promise;
                    };

                    scope.ac_option_delimited_remote = {
                        suggest: suggestLabelRemoteAndDelimited,
                        on_error: console.log
                    };

                    scope.$watch('userInput', function (oldVal, newVal) {
console.log('!');
                    });
                }
            }
        }]);