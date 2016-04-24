'use strict';

angular.module('trackingSystem.users.user-issues-directive', [])
    .directive('userIssues', ['$location', 'issuesDetailsData', 'pageSize', function ($location, issuesDetailsData, pageSize) {
        return {
            restrict: 'A',
            priority: 100000,
            templateUrl: 'app/users/user-issues.html',
            scope: {},
            link: function (scope) {
                scope.params = {
                    'startPage': 1,
                    'pageSize': pageSize,
                    'orderBy': 'DueDate desc&IssueKey'
                };
                issuesDetailsData.getUserIssues(scope.params.pageSize, scope.params.startPage, scope.params.orderBy)
                    .then(function (response) {
                        scope.userIssues = response.data;
                    }, function (error) {
                        notifier.error(error.data.Message);
                    });

                scope.issueSelected = function (id) {
                    $location.path('/issues/' + id);
                };
            }
        };
    }]);