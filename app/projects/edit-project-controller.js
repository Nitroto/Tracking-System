'use strict';

angular.module('trackingSystem.projects.edit', [])
    .controller('EditProjectController', [
        '$scope',
        '$routeParams',
        '$location',
        'notifier',
        'converter',
        'userDetailsData',
        'projectDetailsData',
        'data',
        function ($scope, $routeParams, $location, notifier, converter, userDetailsData, projectDetailsData, data) {
            $scope.projectData = {};

            projectDetailsData.getProject($routeParams.id)
                .then(function (response) {
                    $scope.projectData = {
                        Id: response.data.Id,
                        Name: response.data.Name,
                        ProjectKey: response.data.ProjectKey,
                        Description: response.data.Description,
                        Lead: response.data.Lead,
                        Labels: converter.convertArrayToString(response.data.Labels),
                        Priorities: converter.convertArrayToString(response.data.Priorities),
                        TransitionSchemeId: response.data.TransitionSchemeId
                    };

                    document.getElementById("description").defaultValue = $scope.projectData.Description;
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

            $scope.editProject = function (projectData) {
                console.log(projectData);
                var project = {
                    Name: projectData.name,
                    Description: projectData.description,
                    ProjectKey: projectData.key,
                    LeadId: projectData.leadId,
                    Labels: [],
                    Priorities: []
                };

                // data.put('projects', project)
                //     .then(function (response) {
                //         console.log(response);
                //         notifier.success(response)
                //     }, function (error) {
                //         console.log(error);
                //         notifier.error(error.data.Message);
                //     });
            };

            $scope.cancel = function () {
                $location.path('/projects/' + $scope.projectData.Id);
            };
        }
    ]);