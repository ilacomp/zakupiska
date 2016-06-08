/* Auth Services */
(function() {
    angular.module('APP').factory('authService', authService);

    authService.$inject = ['$resource', '$rootScope'];

    function authService($resource, $rootScope) {
        return $resource('/api/v1/auth/:action', {action: '', token: $rootScope.token}, {
            checkAuth: {method: 'get'},
            login: {method: 'post', params: {action: 'login'}},
            logout: {method: 'post', params: {action: 'logout'}},
            register: {method: 'post', params: {action: 'register'}},
        });
    };
})();