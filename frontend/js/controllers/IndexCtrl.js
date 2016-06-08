/**
 * Created by Илья on 18.01.2016.
 */
(function() {
    angular.module('APP').controller("IndexCtrl", IndexCtrl);

    IndexCtrl.$inject = ['authService', '$state', '$rootScope'];

    function IndexCtrl (authService, $state, $rootScope) {
        this.logout = logout;

        function logout(){
            $rootScope.user = authService.logout({}, function(){
                $state.reload();
            });
        }
    };
})();