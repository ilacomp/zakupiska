/**
 * Created by Илья on 18.01.2016.
 */
(function() {
    angular.module('APP').controller("ListsCtrl", ListsCtrl);

    ListsCtrl.$inject = ['listService', '$mdBottomSheet', '$state'];

    function ListsCtrl (listService, $mdBottomSheet, $state) {
        var self = this;
        this.list = listService.query();
        this.showBottomSheet = showBottomSheet;
        this.gotoList = gotoList;

        function gotoList(id_list) {
            $state.go('list_items', {id_list: id_list});
        }
        function showBottomSheet(item, evt) {
            evt.stopPropagation();
            self.selectedItem = item;
            $mdBottomSheet.show({
                templateUrl   : 'views/bottom-sheet-lists.html',
                controller    : [ '$mdBottomSheet', '$mdToast', ItemsSheetController ],
                controllerAs  : "bs"
            });

            function ItemsSheetController ($mdBottomSheet, $mdToast) {
                this.deleteItem = deleteItem;
                this.editItem = editItem;
                this.item = self.selectedItem;
                var selectedItemIndex = self.list.indexOf(self.selectedItem);

                function editItem() {
                    $mdBottomSheet.hide();
                    $state.go('editlist', {id_list: self.selectedItem.id_list});
                };

                function deleteItem() {
                    $mdBottomSheet.hide();
                    self.selectedItem.$remove({id: self.selectedItem.id_list}, function(data){
                        if (data.error) {
                            $mdToast.showSimple(data.error);
                        } else {
                            self.list.splice(selectedItemIndex, 1);
                        }
                    });

                };
            }
        }
    };
})();