/**
 * Created by Илья on 18.01.2016.
 */
(function() {

    angular.module('APP').controller("RegisterCtrl", RegisterCtrl);

    RegisterCtrl.$inject = ['$state', '$rootScope', 'authService', 'toaster'];

    function RegisterCtrl ($state, $rootScope, authService, toaster) {
        var self = this;
        this.username = null;
        this.email = null;
        this.pass1 = null;
        this.pass2 = null;
        this.error = null;
        this.disabled = false;
        this.register = register;

        function register() {
            self.disabled = true;
            authService.register({username: self.username, email: self.email, pass1: self.pass1, pass2: self.pass2}, function(data){
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

    };
})();