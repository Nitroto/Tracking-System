'use strict';

angular.module('trackingSystem.users.user-issues-directive', [])
    .directive('userIssues', [
        '$location',
        'issuesDetailsData',
        'pageSize',
        function ($location, issuesDetailsData, pageSize) {
            return {
                restrict: 'A',
                templateUrl: 'app/users/user-issues.html',
                scope: {},
                link: function (scope) {
                    scope.params = {
                        'startPage': 1,
                        'pageSize': pageSize,
                        'orderBy': 'DueDate desc&IssueKey'
                    };

                    scope.reloadIssues = function () {
                        issuesDetailsData.getUserIssues(scope.params.pageSize, scope.params.startPage, scope.params.orderBy)
                            .then(function (response) {
                                scope.result = response.data;
                            }, function (error) {
                                notifier.error(error.data.Message);
                            });
                    };

                    scope.reloadIssues();

                    scope.issueSelected = function (id) {
                        $location.path('/issues/' + id);
                    };
                }
            };
        }]);