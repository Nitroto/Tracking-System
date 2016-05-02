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
        function ($scope, $routeParams, $location, notifier, converter, userDetailsData, projectDetailsData) {
            var projectOriginalData = {};
            $scope.project = {};

            projectDetailsData.getProject($routeParams.id)
                .then(function (response) {
                    projectOriginalData = {
                        Id: response.data.Id,
                        Name: response.data.Name,
                        ProjectKey: response.data.ProjectKey,
                        Description: response.data.Description,
                        Lead: response.data.Lead,
                        Labels: converter.convertArrayToString(response.data.Labels),
                        Priorities: converter.convertArrayToString(response.data.Priorities),
                        TransitionSchemeId: response.data.TransitionSchemeId
                    };

                    angular.copy(projectOriginalData, $scope.project);
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
                });

            $scope.editProject = function (projectData) {

                var editedProject = {
                    Name: projectData.Name,
                    Description: projectData.Description !== undefined ? projectData.Description : projectOriginalData.Description,
                    ProjectKey: projectData.ProjectKey,
                    LeadId: projectData.Lead.Id !== undefined ? projectData.Lead.Id : projectOriginalData.Lead.Id,
                    Labels: converter.convertStringToArray(projectData.Labels),
                    Priorities: converter.convertStringToArray(projectData.Priorities)
                };

                projectDetailsData.editProject(projectData.Id, editedProject)
                    .then(function (response) {
                        notifier.success('Project edited successful.');
                        $location.path('projects/' + response.data.Id);
                    });
            };

            $scope.cancel = function () {
                angular.copy(projectOriginalData, $scope.project);
                $location.path('/projects/' + $scope.project.Id);
            };
        }
    ]);