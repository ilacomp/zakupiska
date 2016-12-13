/* Auth Services */
(function() {
    angular.module('APP').factory('sharesService', sharesService);

	sharesService.$inject = ['$resource', 'httpRequestInterceptor'];

    function sharesService($resource,  httpRequestInterceptor) {
        return $resource('/api/v1/shares/:id_list/:id_user', {id_user: ''}, {
            query: {method: 'GET', isArray: true, interceptor : {responseError : httpRequestInterceptor.response}},
            put: {method: 'PUT', interceptor : {responseError : httpRequestInterceptor.response}},
            remove: {method: 'DELETE', interceptor : {responseError : httpRequestInterceptor.response}}
        });
    }
})();