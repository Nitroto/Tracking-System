'use strict';

angular.module('trackingSystem.projects.all', [])
    .controller('AllProjectsController', [
        '$scope',
        '$location',
        'projectDetailsData',
        'pageSize',
        function ($scope, $location, projectDetailsData, pageSize) {
            $scope.projectsParams = {
                'startPage': 1,
                'pageSize': pageSize,
                'filter': ''
            };

            $scope.reloadProjects = function () {
                projectDetailsData.getProjectsByFilter($scope.projectsParams)
                    .then(function (result) {
                        $scope.result = result.data;
                    });
            };

            $scope.reloadProjects();

            $scope.projectSelected = function (id) {
                $location.path('/projects/' + id)
            };
        }
    ]);
