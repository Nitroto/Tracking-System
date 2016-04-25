'use strict';

angular.module('trackingSystem.issue.add', [])
    .controller('AddIssueController', [
        '$scope',
        '$routeParams',
        '$location',
        'notifier',
        'userDetailsData',
        'projectDetailsData',
        'issuesDetailsData',
        'converter',
        function ($scope, $routeParams, $location, notifier, userDetailsData, projectDetailsData, issuesDetailsData, converter) {
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
                console.log(issue);
                issuesDetailsData.addIssue(issue)
                    .then(function (response) {
                        notifier.success('Issue created successful.');
                        console.log(response);
                        $location.path('issues/' + response.data.Id);
                    }, function (error) {
                        notifier.error(error.Message);
                    });
            };

            $scope.cancel = function () {
                $location.path('/projects/' + $scope.projectId);
            };

            // Datepicker
            $scope.dateOptions = {
                // dateDisabled: disabled,
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1
            };

            $scope.datepicker = {
                opened: false
            };

            $scope.openDatepicker = function () {
                $scope.datepicker.opened = true;
            };

            $scope.setDate = function (year, month, day) {
                $scope.issue.dueDate = new Date(year, month, day);
            };

            // Disable weekend selection
            function disabled(data) {
                var date = data.date,
                    mode = data.mode;
                return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
            };
        }
    ]);