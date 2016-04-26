'use strict';

angular.module('trackingSystem.issue.edit', [])
    .controller('EditIssueController', [
        '$scope',
        '$routeParams',
        '$location',
        'notifier',
        'converter',
        'userDetailsData',
        'projectDetailsData',
        'issuesDetailsData',
        function ($scope, $routeParams, $location, notifier, converter, userDetailsData, projectDetailsData, issuesDetailsData) {
            $scope.issueOriginalData = {};
            $scope.issue = {};

            issuesDetailsData.getIssuesById($routeParams.id)
                .then(function (response) {
                    $scope.issueOriginalData = {
                        Id: response.data.Id,
                        Title: response.data.Title,
                        IssueKey: response.data.IssueKey,
                        Description: response.data.Description,
                        DueDate: response.data.DueDate,
                        Project: response.data.Project,
                        Author: response.data.Author,
                        Assignee: response.data.Assignee,
                        Priority: response.data.Priority,
                        Status: response.data.Status,
                        Labels: converter.convertArrayToString(response.data.Labels),
                        AvailableStatuses: converter.convertArrayToString(response.data.AvailableStatuses)
                    };

                    $scope.projectData = projectDetailsData.getProject($scope.issueOriginalData.Project.Id)
                        .then(function (response) {
                            $scope.project = response.data;
                            angular.copy($scope.issueOriginalData, $scope.issue);
                        }, function (error) {
                            notifier.error(error.data.Message)
                        });
                }, function (error) {
                    notifier.error(error.data.Message)
                });

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

            $scope.editIssue = function (issueData) {

                console.log(issueData);

                var editedIssue = {
                    Id: issueData.Id,
                    Title: issueData.Title,
                    IssueKey: issueData.IssueKey,
                    Description: issueData.Description !== undefined ? issueData.Description : $scope.issueOriginalData.Description,
                    DueDate: issueDataa.DueDate !== undefined ? issueData.DueDate : $scope.issueOriginalData.DueDate,
                    Project: issueData.Project,
                    Author: issueData.Author,
                    AssigneeId: issueData.Assignee !== undefined ? issueData.Assignee.Id : $scope.issueOriginalData.Assignee.Id,
                    Priority: issueData.Priority,
                    Status: issueData.Status,
                    Labels: [],
                    AvailableStatuses: []
                };


                // data.put('projects', issue)
                //     .then(function (response) {
                //         console.log(response);
                //         notifier.success(response)
                //     }, function (error) {
                //         console.log(error);
                //         notifier.error(error.data.Message);
                //     });
            };

            $scope.cancel = function () {
                angular.copy($scope.issueOriginalData, $scope.issue);
                $location.path('/issues/' + $scope.issue.Id);
            };
        }
    ]);