'use strict';

angular.module('trackingSystem.projects.add', [])
    .controller('AddProjectController', [
        '$q',
        '$scope',
        '$location',
        'notifier',
        'userDetailsData',
        'projectDetailsData',
        'converter',
        'labelsDetailsData',
        function ($q, $scope, $location, notifier, userDetailsData, projectDetailsData, converter, labelsDetailsData) {
            $scope.project = {};

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
                    });
            };

            $scope.cancel = function () {
                $location.path('/');
            }
        }
    ]);