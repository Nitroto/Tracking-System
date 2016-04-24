'use strict';

angular.module('trackingSystem.issues.data-service', [])
    .factory('issuesDetailsData', [
        'data',
        function (data) {
            function getProjectIssues(id) {
                return data.get('Projects/' + id + '/Issues')
            }

            function getUserIssues(pageSize, pageNumber, orderAttribute) {
                return data.get('Issues/me?pageSize=' + pageSize + '&pageNumber=' + pageNumber + '&orderBy=' + orderAttribute);
            }

            function getIssuesByFilter(query) {
                return data.get('Issues/' + query);
            }

            function getIssuesById(id) {
                return data.get('Issues/' + id);
            }

            function editIssue(id, issueData) {
                return data.put('Projects/' + id, issueData)
            }

            function addIssue(issueData) {
                return data.post('Issues/', issueData)
            }

            function changeIssueStatus(issueId, statusId) {
                return data.put('Issues/' + issueId + '/changestatus?statusid=' + statusId, null);
            }

            return {
                getProjectIssues: getProjectIssues,
                getUserIssues: getUserIssues,
                getIssuesByFilter: getIssuesByFilter,
                getIssuesById: getIssuesById,
                editIssue: editIssue,
                addIssue: addIssue
            }
        }]);