'use strict';

angular.module('trackingSystem.users.user-assigned-issues-directive', [])
    .directive('userAssignedIssues', [
        '$location',
        'issuesDetailsData',
        'pageSize',
        'userDetailsData',
        function ($location, issuesDetailsData, pageSize, userDetailsData) {
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
                        issuesDetailsData.getIssuesByFilter(scope.params)
                            .then(function (response) {
                                scope.result = response.data;
                            }, function (error) {
                                notifier.error(error.data.Message);
                            });
                    };

                    userDetailsData.getUser()
                        .then(function (response) {
                            scope.params = {
                                'startPage': 1,
                                'pageSize': pageSize,
                                'filter': 'Assignee.Id == "' + response.data.Id + '"'
                            };

                            scope.reloadIssues();
                        });

                    scope.issueSelected = function (id) {
                        $location.path('/issues/' + id);
                    };
                }
            };
        }]);