'use strict';

angular.module('trackingSystem.common.notifier-service', [])
    .factory('notifier', [
        'growl',
        function (growl) {
            return {
                success: function (msg) {
                    growl.success(msg);
                },
                warning: function (msg) {
                    growl.warning(msg);
                },
                error: function (msg) {
                    growl.error(msg);
                }
            }
        }
    ]);