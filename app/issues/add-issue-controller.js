'use strict';

angular.module('trackingSystem.issue.add', [])
    .controller('AddIssueController', [
        '$scope',
        '$routeParams',
        '$location',
        'notifier',
        'userDetailsData',
        'data',
        function ($scope, $routeParams, $location, notifier, userDetailsData, data) {
            $scope.projectId = $routeParams.id;

            $scope.loadingUsers = userDetailsData.getAllUsers()
                .then(function (response) {
                    $scope.users = response.data;
                    $scope.formatLead = function (model) {
                        for (var i = 0; i < $scope.users.length; i++) {
                            if (model === $scope.users[i].Id) {
                                return $scope.users[i].Username;
                            }
                        }
                    };
                }, function (error) {
                    notifier.error(error.data.Message)
                });

            $scope.addIssue = function (issueData) {
                var issue = {
                    Title: issueData.title,
                    Description: issueData.description,
                    ProjectId: issueData.projectId,
                    AssignedId: issueData.assignedId,
                    DueDate: issueData.dueDate,
                    Priorities: []
                };
                console.log(issue);
                data.post('projects', project)
                    .then(function (response) {
                        notifier.success(response)
                    }, function (error) {
                        notifier.error(error.data.Message);
                    });
            };

            $scope.cancel = function () {
                $location.path('/projects/' + $scope.projectId);
            }
        }
    ]);