(function() {
    angular.module('APP').controller("ToolBarCtrl", ToolBarCtrl);

    ToolBarCtrl.$inject = ['$mdSidenav'];

    function ToolBarCtrl ($mdSidenav) {
        this.toggleSideBar = toggleSideBar;

        function toggleSideBar (){
            $mdSidenav('left').toggle();
        }

    };
})();