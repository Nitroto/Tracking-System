'use strict';

angular.module('trackingSystem.projects.add', [])
    .controller('AddProjectController', [
        '$scope',
        '$location',
        'notifier',
        'userDetailsData',
        'projectDetailsData',
        'converter',
        function ($scope, $location, notifier, userDetailsData, projectDetailsData, converter) {
            $scope.project = {};

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

            $scope.addProject = function (projectData) {
                var projectKey = converter.textToAbbreviation(projectData.Name).replace(/\s+/g, '');

                var project = {
                    Name: projectData.Name,
                    Description: projectData.Description,
                    ProjectKey: projectKey,
                    LeadId: projectData.LeadId,
                    Labels: converter.convertStringToArray(projectData.Labels),
                    Priorities: converter.convertStringToArray(projectData.Priorities)
                };
                
                projectDetailsData.addProject(project)
                    .then(function (response) {
                        notifier.success('Project added successful.');
                        $location.path('/projects/' + response.data.Id);
                    }, function (error) {

                        notifier.error(error.data.Message);
                    });
            };

            $scope.cancel = function () {
                $location.path('/');
            }
        }
    ]);