'use strict';

angular.module('trackingSystem.projects.project-view', [])
    .controller('ViewProjectController', [
        '$scope',
        '$location',
        '$routeParams',
        'projectDetailsData',
        'issuesDetailsData',
        function ($scope, $location, $routeParams, projectDetailsData, issuesDetailsData) {
            $scope.showMy = true;
            $scope.showAll = false;
            projectDetailsData.getProject($routeParams.id)
                .then(function (project) {
                    $scope.project = project.data;
                    $scope.currentUserId = $scope.$parent.currentUser.Id;
                    issuesDetailsData.getProjectIssues($routeParams.id)
                        .then(function (issues) {
                            $scope.project.issues = issues.data;
                        });
                }, function (error) {
                    notifier.error(error.message)
                });


            $scope.editProject = function (id) {
                $location.path('/projects/' + id + '/edit')
            };

            $scope.addIssue = function (id) {
                $location.path('/projects/' + id + '/add-issue');
            };

            $scope.deleteProject = function () {
                //Not available in back-end
            };

            $scope.showUserIssues = function () {
                $scope.showMy = true;
                $scope.showAll = false;
            };

            $scope.showAllIssues = function () {
                $scope.showMy = false;
                $scope.showAll = true;
            };
        }
    ]);