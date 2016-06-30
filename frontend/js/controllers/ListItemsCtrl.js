/**
 * Created by Илья on 18.01.2016.
 */
(function() {
    angular.module('APP').controller("ListItemsCtrl", ListItemsCtrl);

    ListItemsCtrl.$inject = ['$state', 'listItemsService', '$mdBottomSheet'];

    function ListItemsCtrl ($state, listItemsService, $mdBottomSheet) {
        var self = this;
        this.id_list = $state.params.id_list;
        this.lightToolbar = false;
        this.showBottomSheet = showBottomSheet;
        listItemsService.get({id_list: this.id_list}, onLoad);

        function onLoad(data){
            self.items = data.items;
            self.list = data.list;
            if (self.list.color == '#ffffff') {
                self.list.color = '#3f51b5';
            } else {
                self.lightToolbar = isLight(self.list.color);
            }
        }

        function isLight( color ) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);

            return ( parseInt(result[1], 16) & 255 )
                + ( parseInt(result[2], 16) & 255 )
                + ( parseInt(result[3], 16) & 255 )
                > 3 * 256 / 2;
        }

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
                    listItemsService.remove({id_list: self.selectedItem.id_list, id_item: self.selectedItem.id_item}, onRemove);

                    function onRemove(data){
                        if (data.error) {
                            $mdToast.showSimple(data.error);
                        } else {
                            self.items.splice(selectedItemIndex, 1);
                        }
                    }
                };
            }
        }
    };
})();