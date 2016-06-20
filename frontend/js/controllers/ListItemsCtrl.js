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
                var vm = this;
                this.item = self.selectedItem;
                this.deleteItem = deleteItem;

                function deleteItem() {
                    $mdBottomSheet.hide();
                    // listItemsService.remove({id_list: self.id_list, id_item: vm.item.id_item} , function(data){
                    //     if (data.error) {
                    //         $mdToast.showSimple(data.error);
                    //     } else {
                    //         debugger;
                    //         self.items.query();
                    //     }
                    // });
                    vm.item.$remove({id_list: vm.item.id_list, id_item: vm.item.id_item}, function(data){
                        if (data.error) {
                            $mdToast.showSimple(data.error);
                        } else {
                            delete vm.item;
                            console.log(self.items);
                            debugger;
                            // debugger;
                            // self.items.$query();
                        }
                    });

                };
            }
        }
    };
})();