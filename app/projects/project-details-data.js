'use strict';

angular.module('trackingSystem.projects.data-service', [])
    .factory('projectDetailsData', [
        'data',
        function (data) {
            function getProject(id) {
                return data.get('Projects/' + id)
            }

            function getAllProjects() {
                return data.get('Projects/')
            }

            function editProject(id, project) {
                return data.put('Projects/' + id, project)
            }

            function addProject(project) {
                return data.post('Projects/', project)
            }

            return {
                getAllProjects: getAllProjects,
                getProject: getProject,
                editProject: editProject,
                addProject: addProject
            }
        }]);