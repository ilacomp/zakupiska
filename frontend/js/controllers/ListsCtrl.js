/**
 * Created by Илья on 18.01.2016.
 */
(function() {
    angular.module('APP').controller("ListsCtrl", ListsCtrl);

    ListsCtrl.$inject = ['listService'];

    function ListsCtrl (listService) {
        this.list = listService.query();
    };
})();