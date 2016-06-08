/**
 * Created by Илья on 18.01.2016.
 */
(function() {
    angular.module('APP').controller("LoginCtrl",LoginCtrl);

    LoginCtrl.$inject = ['$state', '$rootScope', 'authService', '$location', '$mdToast'];

    function LoginCtrl($state, $rootScope, authService, $location, $mdToast) {
        var self = this;
        this.username = null;
        this.pass = null;
        this.disabled = false;
        this.login = login;

        function login() {
            self.disabled = true;
            authService.login({username: self.username, password: self.pass}, successCallback, errorCallback);

            function successCallback(){
                self.disabled = false;
                if ($rootScope.redirectURL) {
                    $location.url($rootScope.redirectURL);
                    delete $rootScope.redirectURL;
                } else {
                    $state.go('index');
                }
            }

            function errorCallback(error){
                self.disabled = false;
                $mdToast.showSimple(error);
            }
        };
    }
})();