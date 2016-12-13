/**
 * Created by Илья on 13.12.2016.
 */
(function() {
    angular.module('APP').controller("ShareListCtrl", ShareListCtrl);

	ShareListCtrl.$inject = ['friendsService', 'sharesService', '$state', '$mdToast', '$rootScope', '$q'];

    function ShareListCtrl (friendsService, sharesService, $state, $mdToast, $rootScope, $q) {
	    var self = this;
        this.id_list = $state.params.id_list;
        this.friends = [];
	    this.checkItem = checkItem;
        activate();

        function activate() {
            $rootScope.loading = true;
        	$q.all([
                friendsService.query().$promise,
				sharesService.query({id_list: self.id_list}).$promise
			]).then(function(results){
				if (angular.isArray(results[1])) {
                    self.friends = results[0].map(function (friend) {
                        friend.checked = results[1].some(function (item) {
                            return item.id_user == friend.id_user;
                        });
                        return friend;
                    });
                }
                $rootScope.loading = false;
			});
        }

        function checkItem(item) {
			if (item.checked) {
                sharesService.put({id_list: self.id_list}, {id_user: item.id_user}, onFinished);
			} else {
                sharesService.remove({id_list: self.id_list, id_user: item.id_user}, onFinished);
			}

            function onFinished(data){
                if (data.error) {
                    $mdToast.showSimple(data.error);
                }
            }
        }
    }
})();