/**
 * Created by Илья on 13.12.2016.
 */
(function() {
    angular.module('APP').controller("ShareListCtrl", ShareListCtrl);

	ShareListCtrl.$inject = ['friendsService', 'sharesService', '$state', '$mdToast', '$rootScope'];

    function ShareListCtrl (friendsService, sharesService, $state, $mdToast, $rootScope) {
	    var self = this;
	    this.deleteFriend = deleteFriend;
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
    }
})();