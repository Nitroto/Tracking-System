'use strict';

angular.module('trackingSystem.issues.issue-view', [])
    .controller('ViewIssueController', [
        '$scope',
        '$routeParams',
        'issuesDetailsData',
        'notifier',
        function ($scope, $routeParams, issuesDetailsData, notifier) {

            issuesDetailsData.getIssuesById($routeParams.id)
                .then(function (response) {
                    $scope.issue = response.data;
                }, function (error) {
                    notifier.error(error.message)
                });
            
            $scope.issueDelete = function () {
                //Not available in back-end
            }
        }
    ]);