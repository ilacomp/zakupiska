/**
 * Created by Илья on 18.01.2016.
 */
(function() {
    angular.module('APP').controller("NewListCtrl", NewListCtrl);

    NewListCtrl.$inject = ['$state', 'listService', '$mdToast'];

    function NewListCtrl ($state, listService, $mdToast) {
        var self = this;
        this.title = '';
        this.color = '#ffffff';
        this.disabled = false;
        this.add = add;

        function add(){
            self.disabled = true;
            listService.put({title: self.title, color: self.color}, function(data){
                self.disabled = false;
                if (data.error) {
                    $mdToast.showSimple(data.error);
                } else {
                    $state.go('list_items', {id_list: data.id_list});
                }
            });

        }
    };
})();