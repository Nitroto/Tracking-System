'use strict';

angular.module('trackingSystem.issues.issue-filter', [])
    .filter('issueFilter', [
        function () {
            return function (issue, search) {
                // angular.forEach(, function (value, key) {
                //     angular.forEach(value, function (value2, key2) {
                        if (issue.Assignee.Id === search) {
                            return issue;
                        }
            //         })
            //     });
            //     return result;
            //
            }
        }]);