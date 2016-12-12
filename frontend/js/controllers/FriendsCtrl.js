/**
 * Created by Илья on 18.01.2016.
 */
(function() {
    angular.module('APP').controller("FriendsCtrl", FriendsCtrl);

    FriendsCtrl.$inject = ['friendsService', '$state', '$mdToast', '$rootScope'];

    function FriendsCtrl (friendsService, $state, $mdToast, $rootScope) {
	    var self = this;
	    this.deleteFriend = deleteFriend;
	    this.querySearch = querySearch;
	    this.selectedItemChange = selectedItemChange;
        activate();

        function activate() {
	        self.friends = friendsService.query();
        }

        function deleteFriend(item, evt) {
            evt.stopPropagation();
	        var selectedItemIndex = self.friends.indexOf(item);
	        $rootScope.loading = true;
	        item.$remove({id: item.id_user}, function(data){
		        $rootScope.loading = false;
		        if (data.error) {
			        $mdToast.showSimple(data.error);
		        } else {
			        self.friends.splice(selectedItemIndex, 1);
		        }
	        });
        }

        function querySearch(text) {
            return friendsService.post({}, {text: text});
        }

	    function selectedItemChange(item) {
            if (item){
	            $rootScope.loading = true;
                friendsService.put({}, {id_user: item.id_user}, function(data){
	                $rootScope.loading = false;
	                if (data.error) {
		                $mdToast.showSimple(data.error);
	                } else {
	                    self.searchText = '';
	                    self.selectedItem = null;
		                activate();
	                }
                });
            }
        }

    };
})();