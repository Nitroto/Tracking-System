'use strict';

angular.module('trackingSystem.comments.data-service', [])
    .factory('commentsDetailsData', [
        'data',
        function (data) {
            function getComments(issueId) {
                return data.get('Issues/' + issueId + '/comments')
            }

            function addComment(issueId, comment) {
                return data.post('Issues/' + issueId + '/comments', comment)
            }

            return {
                getComments: getComments,
                addComment: addComment
            }
        }]);