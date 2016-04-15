'use strict';

angular.module('trackingSystem.common', [])
    .directive('redirect', ['identity', function (identity) {
        return {
            restrict: 'A',
            priority: 100000,
            scope: false,
            link: function () {

            },
            compile: function (element, attr, linker) {
                var accessDenied = true;
                var user = identity.getCurrentUser().then(function(user){
                    var attributes = attr.access.split(' ');
                    for (var i in attributes) {
                        
                    }

                });

            }
        }
    }]);