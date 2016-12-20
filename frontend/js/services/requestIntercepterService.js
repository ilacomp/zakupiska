/**
 * Created by Илья on 21.01.2016.
 */
(function() {
    angular.module('APP').factory('httpRequestInterceptor', httpRequestInterceptor);

    httpRequestInterceptor.$inject = ['$injector', '$rootScope'];
    function httpRequestInterceptor($injector, $rootScope) {
        return {
            response: function(response) {
                if (response.status === 401) {
                    var authService = $injector.get('authService');
                    var $state = $injector.get('$state');
                    authService.logout(function(){
                        $state.reload();
                    });
                }
                return response;
            },
            request: function(config) {
                var authService = $injector.get('authService');
                if (config.url.indexOf('/api/') === 0 && authService.isAuth()) {
	                config.headers['x-session-token'] = authService.getToken();
                }
                return config;
            }
        };
    }
})();