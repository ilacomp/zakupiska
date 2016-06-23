/**
 * Created by Илья on 18.01.2016.
 */
(function() {
    angular.module('APP').controller("ListsCtrl", ListsCtrl);

    ListsCtrl.$inject = ['listService', '$mdBottomSheet'];

    function ListsCtrl (listService, $mdBottomSheet) {
        var self = this;
        this.list = listService.query();
        this.showBottomSheet = showBottomSheet;

        function showBottomSheet(item) {
            self.selectedItem = item;
            $mdBottomSheet.show({
                templateUrl   : 'views/bottom-sheet-lists.html',
                controller    : [ '$mdBottomSheet', '$mdToast', ItemsSheetController ],
                controllerAs  : "bs"
            });

            function ItemsSheetController ($mdBottomSheet, $mdToast) {
                this.deleteItem = deleteItem;
                this.item = self.selectedItem;
                var selectedItemIndex = self.list.indexOf(self.selectedItem);
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