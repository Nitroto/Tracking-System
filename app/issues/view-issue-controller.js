'use strict';

angular.module('trackingSystem.issues.issue-view', [])
    .controller('ViewIssueController', [
        '$scope',
        '$routeParams',
        '$location',
        'issuesDetailsData',
        'commentsDetailsData',
        'projectDetailsData',
        'notifier',
        function ($scope, $routeParams, $location, issuesDetailsData, commentsDetailsData, projectDetailsData, notifier) {
            $scope.role = {
                admin: false,
                lead: false,
                assignee: false
            };
            $scope.reloadIssue = function () {
                issuesDetailsData.getIssuesById($routeParams.id)
                    .then(function (response) {
                        $scope.issue = response.data;
                        projectDetailsData.getProject(response.data.Project.Id)
                            .then(function (projectData) {
                                $scope.role.admin = $scope.$parent.currentUser.isAdmin;
                                $scope.role.lead = projectData.data.Lead.Id === $scope.$parent.currentUser.Id;
                                $scope.role.assignee = response.data.Assignee.Id === $scope.$parent.currentUser.Id;
                                commentsDetailsData.getComments(response.data.Id)
                                    .then(function (comments) {
                                        $scope.issue.comments = comments.data;
                                    });

                            });
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
                });
            };

            $scope.commentIssue = function (id, comment) {
                commentsDetailsData.addComment(id, comment)
                    .then(function (response) {
                        notifier.success('Comment added successful.');
                        $scope.reloadIssue();
                    });
                $scope.comment = undefined;
            };


        }
    ]);