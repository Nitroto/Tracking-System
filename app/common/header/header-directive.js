'use strict';

angular.module('trackingSystem.common.header-directive', [])
    .directive('header', function () {
        return {
            restrict: 'A',
            replace: true,
            // scope: {
            //     loggedUser: '='
            // },
            templateUrl: 'app/common/header/navigation-bar.html',
            link: function (scope, element, attrs, controller) {
                console.log(scope);
            }
            // controller: ['$scope', '$filter', function ($scope, $filter) {
            // }]
        }
    });


//link:function(scope,element,attrs,controller){}