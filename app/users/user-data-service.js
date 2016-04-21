'use strict';

angular.module('trackingSystem.users.data', [])
    .factory('userDetailsData', [
        'data',
        function (data) {
            function getUser(authentication) {
                return data.get('Users/me', authentication);
            }

            function getAllUsers() {
                return data.get('Users/');
            }

            function getUserIssues(authentication) {
                return data.get('Issues/me?orderBy=Project.Name desc, IssueKey&pageSize=2&pageNumber=1', authentication);
            }

            function getLinkedProjects(userID) {

            }

            return {
                getAllUsers: getAllUsers,
                getUser: getUser,
                getLinkedProjects: getLinkedProjects,
                getUserIssues: getUserIssues
            }
        }]);