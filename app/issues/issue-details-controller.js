'use strict';

angular.module('trackingSystem.issues', [])
    .controller('IssuesDetailsController', [
        '$scope',
        '$routeParams',
        'projectDetailsData',
        function ($scope, $routeParams, projectDetailsData) {
            projectDetailsData.getAllProjects()
                .then(function (result) {
                    $scope.currentPage = !!$routeParams.$skip ? ($routeParams.$skip / $routeParams.$top) + 1 : 1;
                    $scope.isLastPage = result.data.count <= $scope.currentPage * 20;
                    $scope.projects = result.data;
                    $scope.totalPages = Math.ceil(result.data.count / 20);
                });

        }
    ]);
