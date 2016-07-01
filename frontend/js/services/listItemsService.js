/* Auth Services */
(function() {
    angular.module('APP').factory('listItemsService', listItemsService);

    listItemsService.$inject = ['$resource', 'httpRequestInterceptor'];

    function listItemsService($resource, httpRequestInterceptor) {
        return $resource('/api/v1/lists/:id_list/:id_item', {id_list: '', id_item: ''}, {
            get: {method: 'GET', interceptor : {responseError : httpRequestInterceptor.response}},
            post: {method: 'POST', interceptor : {responseError : httpRequestInterceptor.response}},
            put: {method: 'PUT', interceptor : {responseError : httpRequestInterceptor.response}},
            remove: {method: 'DELETE', interceptor : {responseError : httpRequestInterceptor.response}}
        }) ;
    };
})();