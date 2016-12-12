/* Auth Services */
(function() {
    angular.module('APP').factory('listService', listService);

    listService.$inject = ['$resource', 'httpRequestInterceptor'];

    function listService($resource,  httpRequestInterceptor) {
        return $resource('/api/v1/lists/:id', {id: ''}, {
            query: {method: 'GET', isArray: true, interceptor : {responseError : httpRequestInterceptor.response}},
            put: {method: 'PUT', interceptor : {responseError : httpRequestInterceptor.response}},
            post: {method: 'POST', interceptor : {responseError : httpRequestInterceptor.response}},
            copy: {method: 'POST', params: {id: 'copy'}, interceptor : {responseError : httpRequestInterceptor.response}},
            remove: {method: 'DELETE', interceptor : {responseError : httpRequestInterceptor.response}}
        }) ;
    };
})();