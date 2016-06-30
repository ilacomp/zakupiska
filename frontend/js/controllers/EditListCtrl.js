/**
 * Created by Илья on 18.01.2016.
 */
(function() {
    angular.module('APP').controller("EditListCtrl", EditListCtrl);

    EditListCtrl.$inject = ['$state', 'listService', '$mdToast'];

    function EditListCtrl ($state, listService, $mdToast) {
        var self = this;
        this.id_list = $state.params.id_list;
        this.disabled = false;
        this.save = save;
        listService.get({id: this.id_list}, onLoad);

        function onLoad(data){
            self.list = data.list;
        }

        function save(){
            self.disabled = true;
            listService.post({id: self.id_list}, {title: self.list.title, color: self.list.color}, function(data){
                self.disabled = false;
                if (data.error) {
                    $mdToast.showSimple(data.error);
                } else {
                    $state.go('lists');
                }
            });
        }
    };
})();