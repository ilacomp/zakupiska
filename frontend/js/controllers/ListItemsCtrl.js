/**
 * Created by Илья on 18.01.2016.
 */
(function() {
    angular.module('APP').controller("ListItemsCtrl", ListItemsCtrl);

    ListItemsCtrl.$inject = ['$state', 'listItemsService', '$mdBottomSheet'];

    function ListItemsCtrl ($state, listItemsService, $mdBottomSheet) {
        var self = this;
        this.id_list = $state.params.id_list;
        this.items = listItemsService.query({id_list: this.id_list});
        this.showBottomSheet = showBottomSheet;

        function showBottomSheet(item) {
            self.selectedItem = item;
            $mdBottomSheet.show({
                templateUrl   : 'views/bottom-sheet-items.html',
                controller    : [ '$mdBottomSheet', '$mdToast', 'listItemsService', ItemsSheetController ],
                controllerAs  : "bs"
            });

            function ItemsSheetController ($mdBottomSheet, $mdToast, listItemsService) {
                this.deleteItem = deleteItem;
                this.item = self.selectedItem;
                var selectedItemIndex = self.items.indexOf(self.selectedItem);
                function deleteItem() {
                    $mdBottomSheet.hide();
                    self.selectedItem.$remove({id_list: self.selectedItem.id_list, id_item: self.selectedItem.id_item}, function(data){
                        if (data.error) {
                            $mdToast.showSimple(data.error);
                        } else {
                            self.items.splice(selectedItemIndex, 1);
                        }
                    });

                };
            }
        }
    };
})();