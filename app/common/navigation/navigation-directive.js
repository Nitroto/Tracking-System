'use strict';

angular.module('trackingSystem.common.navigation-directive', [])
    .directive('navigation', function () {
        return {
            restrict: 'A',
            replace: true,
            // scope: {
            //     logout: '&',
            //     currentUser: '='
            // },
            templateUrl: 'app/common/navigation/navigation-bar.html',
            link: function (scope, element, attrs, controller) {

            }
            // controller: ['$scope', '$filter', function ($scope, $filter) {
            //     $scope.$apply();
            // }]
        }
    });


//link:function(scope,element,attrs,controller){}