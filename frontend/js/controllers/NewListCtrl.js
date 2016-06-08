/**
 * Created by Илья on 18.01.2016.
 */
(function() {
    angular.module('APP').controller("NewListCtrl", NewListCtrl);

    NewListCtrl.$inject = ['$state', 'listService'];

    function NewListCtrl ($state, listService) {
        var self = this;
        this.title = '';
        this.color = '#FFFFFF';
        this.disabled = false;
        this.add = add;

        function add(){
            self.disabled = true;
            listService.put({title: self.title, color: self.color}, function(data){
                self.disabled = false;
                if (data.error) {
                    toaster.error("Ошибка", data.error);
                } else {
                    $state.go('list_detail', {id_list: data.id_list});
                }
            });

        }
    };
})();