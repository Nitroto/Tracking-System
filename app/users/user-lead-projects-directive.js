'use strict';

angular.module('trackingSystem.users.user-lead-projects-directive', [])
    .directive('userLeadProjects', [
        '$location',
        'projectDetailsData',
        'pageSize',
        'userDetailsData',
        function ($location, projectDetailsData, pageSize, userDetailsData) {
            return {
                restrict: 'A',
                templateUrl: 'app/users/user-lead-projects.html',
                scope: {},
                link: function (scope) {

                    scope.reloadProjects = function () {
                        projectDetailsData.getProjectsByFilter(scope.params)
                            .then(function (response) {
                                scope.result = response.data;
                            }, function (error) {
                                notifier.error(error.data.Message);
                            });
                    };

                    userDetailsData.getUser()
                        .then(function (response) {
                            scope.params = {
                                'startPage': 1,
                                'pageSize': pageSize,
                                'filter': 'Lead.Id == "' + response.data.Id + '"'
                            };

                            scope.reloadProjects();
                        });

                    scope.projectSelected = function (id) {
                        $location.path('/projects/' + id);
                    };
                }
            };
        }]);