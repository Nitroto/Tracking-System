'use strict';

angular.module('trackingSystem.issues.issue-view', [])
    .controller('ViewIssueController', [
        '$scope',
        '$routeParams',
        '$location',
        'issuesDetailsData',
        'commentsDetailsData',
        'notifier',
        function ($scope, $routeParams, $location, issuesDetailsData, commentsDetailsData, notifier) {

            issuesDetailsData.getIssuesById($routeParams.id)
                .then(function (response) {
                    $scope.issue = response.data;
                    commentsDetailsData.getComments(response.data.Id)
                        .then(function (comments) {
                            $scope.issue.comments = comments.data;
                        }, function (error) {
                            notifier.error(error.data.Message)
                        });
                }, function (error) {
                    notifier.error(error.data.Message)
                });


            $scope.issueDelete = function () {
                //Not available in back-end
            };

            $scope.editIssue = function (id) {
                $location.path('/issues/' + id + '/edit')
            };

            $scope.changeStatus = function (id) {
                // $location.path('#/issues/' + id + '/edit')
            };

            $scope.commentIssue = function (id, comment) {
                commentsDetailsData.addComment(id, comment)
                    .then(function (response) {
                        console.log(response);
                        notifier.success('Comment added successful.');
                    }, function (error) {
                        notifier.error(error.Message);
                    });
                $scope.comment = undefined;
            };
        }
    ]);