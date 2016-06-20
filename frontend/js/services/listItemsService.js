/* Auth Services */
(function() {
    angular.module('APP').factory('listItemsService', listItemsService);

    listItemsService.$inject = ['$resource', 'authService', 'httpRequestInterceptor'];

    function listItemsService($resource, authService, httpRequestInterceptor) {
        return $resource('/api/v1/lists/:id_list/items/:id_item', {id_list: '', id_item: ''}, {
            query: {method: 'GET', isArray: true, interceptor : {responseError : httpRequestInterceptor.response}},
            put: {method: 'PUT', interceptor : {responseError : httpRequestInterceptor.response}},
            remove: {method: 'DELETE', interceptor : {responseError : httpRequestInterceptor.response}}
        }) ;
    };
})();