/* Auth Services */
(function() {
    angular.module('APP').factory('listService', listService);

    listService.$inject = ['$resource', '$rootScope', 'httpRequestInterceptor'];

    function listService($resource, $rootScope, httpRequestInterceptor) {
        return $resource('/api/v1/lists/:id', {id: '', token: $rootScope.token}, {
            query: {method: 'GET', isArray: true, interceptor : {responseError : httpRequestInterceptor.response}},
            put: {method: 'PUT', interceptor : {responseError : httpRequestInterceptor.response}}
        }) ;
    };
})();