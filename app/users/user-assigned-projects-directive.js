'use strict';

angular.module('trackingSystem.users.user-assigned-projects-directive', [])
    .directive('userAssignedProjects', [
        '$location',
        'issuesDetailsData',
        'pageSize',
        'userDetailsData',
        'projectDetailsData',
        function ($location, issuesDetailsData, pageSize, userDetailsData, projectDetailsData) {
            return {
                restrict: 'A',
                templateUrl: 'app/users/user-assigned-projects.html',
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
                                if (response.data.TotalCount > scope.params.pageSize) {
                                    scope.params.pageSize = response.data.TotalCount;
                                    scope.reloadIssues();
                                }
                                scope.result = [];
                                var indexes = {};
                                angular.forEach(response.data.Issues, function (value, key) {
                                    if (!indexes.hasOwnProperty(value.Project.Id)) {
                                        scope.result.push(value.Project);
                                        indexes[value.Project.Id] = null;
                                    }
                                });
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

                    scope.projectSelected = function (id) {
                        $location.path('/projects/' + id);
                    };
                }
            };
        }]);