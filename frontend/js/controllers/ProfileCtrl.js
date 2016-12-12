/**
 * Created by Илья on 18.01.2016.
 */
(function() {

    angular.module('APP').controller("ProfileCtrl", ProfileCtrl);

    ProfileCtrl.$inject = ['$state', '$rootScope', '$location', 'authService', '$mdToast'];

    function ProfileCtrl ($state, $rootScope, $location, authService, $mdToast) {
        var self = this;
        this.user = {};
        this.error = null;
        this.save = save;
        activate();

        function activate() {
            self.user = authService.getUser();
        }

        function save() {
	        $rootScope.loading = true;
	        authService.updateUser(self.user, successCallback, errorCallback);
            
            function successCallback(){
	            $rootScope.loading = false;
	            $state.go('index');
            }
            
            function errorCallback(error){
	            $rootScope.loading = false;
	            $mdToast.showSimple(error);
            }

        };

    };
})();