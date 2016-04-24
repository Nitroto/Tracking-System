'use strict';

angular.module('trackingSystem.issues.issue-view', [])
    .controller('ViewIssueController', [
        '$scope',
        '$routeParams',
        '$location',
        'issuesDetailsData',
        'notifier',
        function ($scope, $routeParams, $location, issuesDetailsData, notifier) {

            issuesDetailsData.getIssuesById($routeParams.id)
                .then(function (response) {
                    $scope.issue = response.data;
                }, function (error) {
                    notifier.error(error.message)
                });

            $scope.issueDelete = function () {
                //Not available in back-end
            };

            $scope.editIssue = function (id) {
                $location.path('#/issues/' + id + '/edit')
            };

            $scope.changeStatus = function (id) {
                // $location.path('#/issues/' + id + '/edit')
            };

            $scope.comment = function (id) {
                // href="#/projects/{{issue.Id}}/add-issue"
            };
        }
    ]);