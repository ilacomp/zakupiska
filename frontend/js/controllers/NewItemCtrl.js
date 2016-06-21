/**
 * Created by Илья on 18.01.2016.
 */
(function() {
    angular.module('APP').controller("NewItemCtrl", NewItemCtrl);

    NewItemCtrl.$inject = ['$state', '$window', 'listItemsService', '$mdToast'];

    function NewItemCtrl ($state, $window, listItemsService, $mdToast) {
        var self = this;
        var defaultProduct = {
            title: '',
            amount: ''
        };
        this.product = angular.copy(defaultProduct);
        this.disabled = false;
        this.id_list = $state.params.id_list;
        this.add = add;
        this.addReturn = addReturn;
        this.goBack = goBack;

        function add(){
            self.disabled = true;
            listItemsService.put({id_list: self.id_list}, self.product, function(data){
                self.disabled = false;
                if (data.error) {
                    $mdToast.showSimple(data.error);
                } else {
                    self.product = angular.copy(defaultProduct);
                    var element = $window.document.getElementById('new-item-title');
                    if(element) element.focus();
                }
            });

        }

        function addReturn(){
            self.disabled = true;
            listItemsService.put({id_list: self.id_list}, self.product, function(data){
                self.disabled = false;
                if (data.error) {
                    $mdToast.showSimple(data.error);
                } else {
                    goBack();
                }
            });
        }

        function goBack() {
            $state.go('list_items', {id_list: self.id_list});
        }
    };
})();