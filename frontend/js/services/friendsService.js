/* Auth Services */
(function() {
    angular.module('APP').factory('friendsService', friendsService);

	friendsService.$inject = ['$resource', 'httpRequestInterceptor'];

    function friendsService($resource,  httpRequestInterceptor) {
        return $resource('/api/v1/friends/:id', {id: ''}, {
            query: {method: 'GET', isArray: true, interceptor : {responseError : httpRequestInterceptor.response}},
	        get: {method: 'GET', interceptor : {responseError : httpRequestInterceptor.response}},
	        post: {method: 'POST', isArray: true, interceptor : {responseError : httpRequestInterceptor.response}},
            remove: {method: 'DELETE', interceptor : {responseError : httpRequestInterceptor.response}},
            put: {method: 'PUT', interceptor : {responseError : httpRequestInterceptor.response}}
        }) ;
    };
})();