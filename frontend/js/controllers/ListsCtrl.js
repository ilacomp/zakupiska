/**
 * Created by Илья on 18.01.2016.
 */
(function() {
    angular.module('APP').controller("ListsCtrl", ListsCtrl);

    ListsCtrl.$inject = ['listService', '$mdBottomSheet', '$state', '$rootScope', '$mdToast'];

    function ListsCtrl (listService, $mdBottomSheet, $state, $rootScope, $mdToast) {
        var self = this;
        this.showBottomSheet = showBottomSheet;
        this.gotoList = gotoList;
        activate();

        function activate() {
            self.list = listService.query();
        }

        function gotoList(id_list) {
            $state.go('list_items', {id_list: id_list});
        }

        function showBottomSheet(item, evt) {
            evt.stopPropagation();
            self.selectedItem = item;
            $mdBottomSheet.show({
                templateUrl   : 'bottom-sheet-lists.html',
                controller    : [ '$mdBottomSheet', '$mdToast', ItemsSheetController ],
                controllerAs  : "bs"
            });

            function ItemsSheetController ($mdBottomSheet, $mdToast) {
                this.deleteItem = deleteItem;
                this.editItem = editItem;
                this.copyItem = copyItem;
                this.shareItem = shareItem;
                this.item = self.selectedItem;
                var selectedItemIndex = self.list.indexOf(self.selectedItem);

                function editItem() {
                    $mdBottomSheet.hide();
                    $state.go('editlist', {id_list: self.selectedItem.id_list});
                }

	            function shareItem() {
		            $mdBottomSheet.hide();
		            $state.go('sharelist', {id_list: self.selectedItem.id_list});
	            }

                function deleteItem() {
                    $mdBottomSheet.hide();
	                $rootScope.loading = true;
                    self.selectedItem.$remove({id: self.selectedItem.id_list}, function(data){
	                    $rootScope.loading = false;
                        if (data.error) {
                            $mdToast.showSimple(data.error);
                        } else {
                            self.list.splice(selectedItemIndex, 1);
                        }
                    });
                }

                function copyItem() {
                    $mdBottomSheet.hide();
                    $rootScope.loading = true;

                    listService.copy({}, {id: self.selectedItem.id_list}, function(data){
                        $rootScope.loading = false;
                        if (data.error) {
                            $mdToast.showSimple(data.error);
                        } else {
                            activate()
                        }
                    });
                }
            }
        }
    };
})();