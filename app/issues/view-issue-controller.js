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

            $scope.reloadIssue = function () {
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
            };

            $scope.reloadIssue();

            $scope.issueDelete = function () {
                //Not available in back-end
            };

            $scope.editIssue = function (id) {
                $location.path('/issues/' + id + '/edit');
            };

            $scope.changeStatus = function (issueId, statusId) {
                issuesDetailsData.changeIssueStatus(issueId, statusId).then(function (response) {
                    notifier.success('Status changed successful.');
                    $scope.reloadIssue();
                }, function (error) {
                    notifier.error(error.data.Message)
                });
            };

            $scope.commentIssue = function (id, comment) {
                commentsDetailsData.addComment(id, comment)
                    .then(function (response) {
                        notifier.success('Comment added successful.');
                        $scope.reloadIssue();
                    }, function (error) {
                        notifier.error(error.data.Message);
                    });
                $scope.comment = undefined;
            };


        }
    ]);