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

            function getIssuesByFilter(queryParams) {
                return data.get('Issues/?pageSize=' + queryParams.pageSize
                    + '&pageNumber=' + queryParams.startPage
                    + '&filter=' + queryParams.filter);
                // return data.get('Issues/' + query);
            }

            function getIssuesById(id) {
                return data.get('Issues/' + id);
            }

            function editIssue(id, issueData) {
                return data.put('Issues/' + id, issueData)
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
                changeIssueStatus: changeIssueStatus,
                editIssue: editIssue,
                addIssue: addIssue
            }
        }]);