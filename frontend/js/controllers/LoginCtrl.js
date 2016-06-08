/**
 * Created by Илья on 18.01.2016.
 */
(function() {
    angular.module('APP').controller("LoginCtrl",LoginCtrl);

    LoginCtrl.$inject = ['$state', '$rootScope', 'authService', 'toaster', '$location'];

    function LoginCtrl($state, $rootScope, authService, toaster, $location) {
        var self = this;
        this.username = null;
        this.pass = null;
        this.disabled = false;
        this.login = login;

        function login() {
            self.disabled = true;
            authService.login({username: self.username, password: self.pass}, function(data){
                self.disabled = false;
                if (data.user){
                    if (data.user.authorized) {
                        $rootScope.user = data.user;
                        $rootScope.token = data.token;
                        if ($rootScope.redirectURL) {
                            $location.url($rootScope.redirectURL);
                            delete $rootScope.redirectURL;
                        } else {
                            $state.go('index');
                        }
                        return;
                    }
                }
                if (data.error) {
                    toaster.error("Ошибка", data.error);
                }
            });
        };
    }
})();