/**
 * Created by Илья on 18.01.2016.
 */
(function() {
    angular.module('APP').controller("FriendsCtrl", FriendsCtrl);

    FriendsCtrl.$inject = ['authService', '$state', '$mdSidenav'];

    function FriendsCtrl (authService, $state, $mdSidenav) {
        activate();

        function activate() {

        }

    };
})();