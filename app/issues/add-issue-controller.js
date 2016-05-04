'use strict';

angular.module('trackingSystem.issue.add', [])
    .controller('AddIssueController', [
        '$scope',
        '$routeParams',
        '$location',
        '$q',
        '$sce',
        'notifier',
        'userDetailsData',
        'projectDetailsData',
        'issuesDetailsData',
        'converter',
        'labelsDetailsData',
        function ($scope, $routeParams, $location, $q, $sce, notifier, userDetailsData, projectDetailsData, issuesDetailsData, converter, labelsDetailsData) {
            $scope.projectId = $routeParams.id;
            
            // Load necessary data
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

            $scope.projectData = projectDetailsData.getProject($scope.projectId)
                .then(function (response) {
                    $scope.project = response.data;
                }, function (error) {
                    notifier.error(error.data.Message)
                });

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

            // Buttons
            $scope.addIssue = function (issueData) {
                var issue = {
                    Title: issueData.title,
                    Description: issueData.description,
                    ProjectId: issueData.projectId,
                    AssigneeId: issueData.assigneeId,
                    DueDate: issueData.dueDate,
                    PriorityId: issueData.priority,
                    Labels: converter.convertStringToArray(issueData.labels)
                };

                issuesDetailsData.addIssue(issue)
                    .then(function (response) {
                        notifier.success('Issue created successful.');
                        $location.path('issues/' + response.data.Id);
                    });
            };

            $scope.cancel = function () {
                $location.path('/projects/' + $scope.projectId);
            };


        }
    ]);