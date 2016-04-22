'use strict';

angular.module('trackingSystem.projects.edit', [])
    .controller('EditProjectController', [
        '$scope',
        '$routeParams',
        'notifier',
        'userDetailsData',
        'projectDetailsData',
        'data',
        function ($scope, $routeParams, notifier, userDetailsData, projectDetailsData, data) {
            $scope.project = {};
            
            projectDetailsData.getProject($routeParams.id).then(function (response) {
                $scope.projectData = response;
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

            $scope.addProject = function (projectData) {
                var project = {
                    Name: projectData.name,
                    Description: projectData.description,
                    ProjectKey: projectData.key,
                    LeadId: projectData.leadId,
                    Labels: [],
                    Priorities: []
                };

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