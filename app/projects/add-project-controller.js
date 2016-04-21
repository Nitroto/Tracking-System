'use strict';

angular.module('trackingSystem.projects.add', [])
    .controller('AddProjectController', [
        '$scope',
        'notifier',
        'userDetailsData',
        'data',
        function ($scope, notifier, userDetailsData, data) {
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
                var project = {
                    Name: projectData.name,
                    Description: projectData.description,
                    ProjectKey: projectData.key,
                    LeadId: projectData.leadId,
                    Labels: [],
                    Priorities: []
                };

                console.log(project);
                data.post('projects', project)
                    .then(function (response) {
                        console.log(response);
                        notifier.success(response)
                    }, function (error) {
                        console.log(error);
                        notifier.error(error.data.Message);
                    });
            }
        }
    ]);