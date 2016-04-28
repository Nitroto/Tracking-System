'use strict';

angular.module('trackingSystem.projects.data-service', [])
    .factory('projectDetailsData', [
        'data',
        function (data) {
            function getProject(id) {
                return data.get('Projects/' + id);
            }

            function getAllProjects() {
                return data.get('Projects/');
            }

            function getProjectsByFilter(queryParams) {
                return data.get('Projects/?pageSize=' + queryParams.pageSize
                    + '&pageNumber=' + queryParams.startPage
                    + '&filter=' + queryParams.filter);
            }

            function editProject(id, projectData) {
                return data.put('Projects/' + id, projectData);
            }

            function addProject(projectData) {
                return data.post('Projects/', projectData);
            }

            return {
                getProjectsByFilter: getProjectsByFilter,
                getAllProjects: getAllProjects,
                getProject: getProject,
                editProject: editProject,
                addProject: addProject
            }
        }]);