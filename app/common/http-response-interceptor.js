'use strict';

angular.module('trackingSystem.common.http-response-interceptor', [])
    .factory('httpResponseInterceptor', [
        '$q',
        '$location',
        'notifier',
        function ($q, $location, notifier) {
            return {
                'response': function (response) {
                    if (response.data.success !== undefined) {
                        if (response.data.success === true) {
                            response.data = response.data.data;
                        }
                        else if (response.data.success === false) {
                            if (response.data.errorMessage == '') {
                                $location.path('/notfound');
                            }
                            else {
                                notifier.error(response.data.errorMessage);
                            }

                            return $q.reject(response);
                        }
                    }

                    return response;
                },

                'responseError': function (rejection) {
                    if (rejection.data && rejection.data.error_description) {
                        notifier.error(rejection.data.error_description)
                    }
                    else {
                        notifier.error('No connection to the server! Your Internet may be down!');
                    }

                    return $q.reject(rejection);
                }
            }
        }
    ]);