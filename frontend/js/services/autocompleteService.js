/* Auth Services */
(function() {
    angular.module('APP').factory('autocompleteService', autocompleteService);

	autocompleteService.$inject = ['$resource', 'httpRequestInterceptor'];

    function autocompleteService($resource,  httpRequestInterceptor) {
        return $resource('/api/v1/autocomplete/:entity', {}, {
            query: {method: 'POST', isArray: true, interceptor : {responseError : httpRequestInterceptor.response}}
        }) ;
    }
})();