'use strict';

angular.module('trackingSystem.common.footer-directive', [])
    .directive('footer', [
        function () {
            return {
                restrict: 'A',
                replace: true,
                templateUrl: 'app/common/footer/footer.html'
            }
        }]);