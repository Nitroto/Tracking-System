'use strict';

angular.module('trackingSystem.labels.data-service', [])
    .factory('labelsDetailsData', [
        'data',
        function (data) {
            function getFilteredComments(filter) {
                return data.get('Labels/?filter=' + filter)
            }

            return {
                getFilteredComments: getFilteredComments,
            }
        }]);