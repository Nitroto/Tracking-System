'use strict';

angular.module('trackingSystem.issue.edit', [])
    .controller('EditIssueController', [
        '$q',
        '$scope',
        '$routeParams',
        '$location',
        'notifier',
        'converter',
        'userDetailsData',
        'projectDetailsData',
        'issuesDetailsData',
        'labelsDetailsData',
        function ($q, $scope, $routeParams, $location, notifier, converter, userDetailsData, projectDetailsData, issuesDetailsData, labelsDetailsData) {
            var issueOriginalData = {};
            $scope.issue = {};

            // Should be in directive
            $scope.ac_container_options = {
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

            $scope.ac_option_delimited_remote = {
                suggest: suggestLabelRemoteAndDelimited,
                on_error: console.log
            };
            //-----------------------------------


            issuesDetailsData.getIssuesById($routeParams.id)
                .then(function (response) {
                    issueOriginalData = {
                        Id: response.data.Id,
                        Title: response.data.Title,
                        IssueKey: response.data.IssueKey,
                        Description: response.data.Description,
                        DueDate: new Date(response.data.DueDate),
                        Project: response.data.Project,
                        Author: response.data.Author,
                        Assignee: response.data.Assignee,
                        Priority: response.data.Priority,
                        Status: response.data.Status,
                        Labels: converter.convertArrayToString(response.data.Labels),
                        AvailableStatuses: converter.convertArrayToString(response.data.AvailableStatuses)
                    };

                    $scope.projectData = projectDetailsData.getProject(issueOriginalData.Project.Id)
                        .then(function (response) {
                            $scope.project = response.data;
                            angular.copy(issueOriginalData, $scope.issue);
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

                var editedIssue = {
                    Title: issueData.Title,
                    Description: issueData.Description !== undefined ? issueData.Description : issueOriginalData.Description,
                    DueDate: issueData.DueDate !== undefined ? issueData.DueDate.toJSON() : issueOriginalData.DueDate.toJSON(),
                    AssigneeId: issueData.Assignee !== undefined ? issueData.Assignee.Id : issueOriginalData.Assignee.Id,
                    PriorityId: issueData.Priority.Id,
                    Labels: converter.convertStringToArray(issueData.Labels)
                };

                issuesDetailsData.editIssue(issueData.Id, editedIssue)
                    .then(function (response) {
                        notifier.success('Issue edited successful.');
                        $location.path('issues/' + response.data.Id);
                    });
            };

            $scope.cancel = function () {
                angular.copy(issueOriginalData, $scope.issue);
                $location.path('/issues/' + $scope.issue.Id);
            };
        }
    ]);