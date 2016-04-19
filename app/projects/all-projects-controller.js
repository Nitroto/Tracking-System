'use strict';

angular.module('trackingSystem.projects.all', [])
    .controller('AllProjectsController', [
        '$scope',
        '$location',
        'notifier',
        'projectDetailsData',
        function ($scope, $location, notifier, projectDetailsData) {
            projectDetailsData.getAllProjects()
                .then(function (result) {
                    // $scope.currentPage = !!$routeParams.$skip ? ($routeParams.$skip / $routeParams.$top) + 1 : 1;
                    // $scope.isLastPage = result.data.count <= $scope.currentPage * 20;
                    $scope.projects = result.data;
                    // $scope.totalPages = Math.ceil(result.data.count / 20);
                }, function (error) {
                    notifier.error(error.message)
                });

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
