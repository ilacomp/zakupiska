/**
 * Created by Илья on 21.01.2016.
 */
(function() {
    angular.module('APP').factory('httpRequestInterceptor', httpRequestInterceptor);

    httpRequestInterceptor.$inject = ['$injector', '$rootScope'];
    function httpRequestInterceptor($injector, $rootScope) {
        return {
            response: function(response) {
                if (response.status === 403) {
                    var authService = $injector.get('authService');
                    var $state = $injector.get('$state');
                    $rootScope.user = authService.logout({}, function(){
                        $state.reload();
                    });
                }
                return response;
            }
        };
    }
})();