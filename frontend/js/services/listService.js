/* Auth Services */
(function() {
    angular.module('APP').factory('listService', listService);

    listService.$inject = ['$resource', 'authService', 'httpRequestInterceptor'];

    function listService($resource, authService, httpRequestInterceptor) {
        return $resource('/api/v1/lists/:id', {id: ''}, {
            query: {method: 'GET', isArray: true, interceptor : {responseError : httpRequestInterceptor.response}},
            put: {method: 'PUT', interceptor : {responseError : httpRequestInterceptor.response}},
            remove: {method: 'DELETE', interceptor : {responseError : httpRequestInterceptor.response}}
        }) ;
    };
})();