'use strict';

angular.module('trackingSystem.dashboard', [])
    .controller('DashboardController', [
        '$scope',
        'userIssues',
        'userProjects',
        function ($scope, userIssues, userProjects) {
            $scope.userIssues = userIssues;
            $scope.userProjects = userProjects;
            //user assigned issues -> ordered by due data in descending order
            // panel wih all the projects that the user is associated
        }
    ]);
