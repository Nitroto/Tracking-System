'use strict';

angular.module('trackingSystem.common.http-response-interceptor', [])
    .factory('httpResponseInterceptor', [
        '$q',
        '$location',
        'notifier',
        function ($q, $location, notifier) {
            return {
                'response': function (response) {
                    // if (response.status !== undefined) {
                    //     if (response.status === 200) {
                    //         response.data = response.data;
                    //     }
                    //     else if (response.status !== 200) {
                    //         if (response.data === '') {
                    //             $location.path('/notfound');
                    //         }
                    //         else {
                    //             notifier.error(response.data.Message);
                    //         }
                    //
                    //         return $q.reject(response);
                    //     }
                    // }

                    return response;
                },

                'responseError': function (rejection) {
                    if (rejection.data && rejection.data.Message) {
                        notifier.error(rejection.data.Message)
                    }
                    else {
                        notifier.error('No connection to the server! Your Internet may be down!');
                    }

                    return $q.reject(rejection);
                }
            }
        }
    ]);