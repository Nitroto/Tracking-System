'use strict';

angular.module('trackingSystem.projects.view', [])
    .controller('ViewProjectController', [
        '$scope',
        '$location',
        '$routeParams',
        'notifier',
        'projectDetailsData',
        'issuesDetailsData',
        function ($scope, $location, $routeParams, notifier, projectDetailsData, issuesDetailsData) {


            projectDetailsData.getProject($routeParams.id)
                .then(function (project) {
                    $scope.project = project.data;
                    issuesDetailsData.getProjectIssues($routeParams.id)
                        .then(function (issues) {
                            $scope.project.issues = issues.data;
                        }, function (error) {
                            notifier.error(error.message)
                        });
                }, function (error) {
                    notifier.error(error.message)
                });


            $scope.projectSelected = function (id) {
                $location.path('/projects/' + id)
            }
        }
    ]);