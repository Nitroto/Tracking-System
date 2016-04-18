'use strict';

angular.module('trackingSystem.users.data', [])
    .factory('userProfileData', [
        'data',
        function (data) {
            function getUser(authentication) {
                return data.get('Users/me', authentication);
            }

            function getLinkedProjects(userID) {

            }

            function getUserIssues(authentication) {
                return data.get('Issues/me?orderBy=Project.Name desc, IssueKey&pageSize=2&pageNumber=1', authentication);
            }

            return {
                getUser: getUser,
                getLinkedProjects: getLinkedProjects
            }
        }]);