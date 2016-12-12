/**
 * Created by Илья on 18.01.2016.
 */
(function() {

    angular.module('APP').controller("RegisterCtrl", RegisterCtrl);

    RegisterCtrl.$inject = ['$state', '$rootScope', '$location', 'authService', '$mdToast'];

    function RegisterCtrl ($state, $rootScope, $location, authService, $mdToast) {
        var self = this;
        this.username = null;
        this.email = null;
        this.pass1 = null;
        this.pass2 = null;
        this.error = null;
        this.register = register;

        function register() {
	        $rootScope.loading = true;
            authService.register({username: self.username, email: self.email, pass1: self.pass1, pass2: self.pass2}, successCallback, errorCallback);

            function successCallback(){
	            $rootScope.loading = false;
                if ($rootScope.redirectURL) {
                    $location.url($rootScope.redirectURL);
                    delete $rootScope.redirectURL;
                } else {
                    $state.go('index');
                }
            }

            function errorCallback(error){
	            $rootScope.loading = false;
                $mdToast.showSimple(error);
            }

        };

    };
})();