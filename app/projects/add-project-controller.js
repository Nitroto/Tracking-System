'use strict';

angular.module('trackingSystem.projects.add', [])
    .controller('AddProjectController', [
        '$scope',
        '$location',
        'notifier',
        'userDetailsData',
        'data',
        function ($scope, $location, notifier, userDetailsData, data) {
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
                    Name: projectData.Name,
                    Description: projectData.Description,
                    ProjectKey: projectData.ProjectKey,
                    LeadId: projectData.LeadId,
                    Labels: [],
                    Priorities: []
                };

                data.post('projects', project)
                    .then(function (response) {
                        notifier.success(response)
                    }, function (error) {
                        notifier.error(error.data.Message);
                    });
            };

            $scope.cancel = function () {
                $location.path('/');
            }
        }
    ]);