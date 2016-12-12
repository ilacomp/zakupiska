/**
 * Created by Илья on 18.01.2016.
 */
(function() {
    angular.module('APP').controller("EditListCtrl", EditListCtrl);

    EditListCtrl.$inject = ['$state', 'listService', '$mdToast', '$rootScope'];

    function EditListCtrl ($state, listService, $mdToast, $rootScope) {
        var self = this;
        this.id_list = $state.params.id_list;
        this.save = save;
        activate();

        function activate() {
	        $rootScope.loading = true;
	        listService.get({id: self.id_list}, function (data) {
		        $rootScope.loading = false;
		        self.list = data.list;
            });
        }

        function save(){
	        $rootScope.loading = true;
            listService.post({id: self.id_list}, {title: self.list.title, color: self.list.color}, function(data){
	            $rootScope.loading = false;
                if (data.error) {
                    $mdToast.showSimple(data.error);
                } else {
                    $state.go('lists');
                }
            });
        }
    };
})();