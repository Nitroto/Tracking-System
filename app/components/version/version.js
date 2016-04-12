'use strict';

angular.module('trackingSystem.version', [
  'trackingSystem.version.interpolate-filter',
  'trackingSystem.version.version-directive'
])

.value('version', '1.0');
