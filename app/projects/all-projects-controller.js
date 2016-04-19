'use strict';

angular.module('trackingSystem.projects.all', [])
    .controller('AllProjectsController', [
        '$scope',
        '$location',
        'notifier',
        'projectDetailsData',
        'pageSize',
        function ($scope, $location, notifier, projectDetailsData, pageSize) {
            $scope.projectsParams = {
                'startPage': 1,
                'pageSize': pageSize,
                'filter': ''
            };

            $scope.reloadProjects = function () {
                projectDetailsData.getProjects($scope.projectsParams)
                    .then(function (result) {
                        $scope.result = result.data;
                    }, function (error) {
                        notifier.error(error.message)
                    });

            };

            $scope.reloadProjects();

            $scope.projectSelected = function (id) {
                $location.path('/projects/' + id)
            }
        }
    ]);


// .controller('ProjectDetailsController', [
//     '$window',
//     '$location',
//     '$route',
//     '$sce',
//     'project',
//     'identity',
//     'sweetAlertDispatcher',
//     'notifier',
//     'projectDetailsData',
//     'addProjectData',
//     'videoUrlUtilities',
//     projectDetailsController]);
