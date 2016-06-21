/**
 * Created by Илья on 18.01.2016.
 */
(function() {
    angular.module('APP').controller("IndexCtrl", IndexCtrl);

    IndexCtrl.$inject = ['authService', '$state', '$mdSidenav'];

    function IndexCtrl (authService, $state, $mdSidenav) {
        this.logout = logout;
        this.closeSideNav = closeSideNav;
        this.isAuth = authService.isAuth;
        this.toggleSideBar = toggleSideBar;

        function toggleSideBar (){
            $mdSidenav('left').toggle();
        }
        
        function closeSideNav    (){
            $mdSidenav('left').close();
        }
        function logout(){
            closeSideNav();
            authService.logout(function(){
                $state.reload();
            });
        }
    };
})();