/**
 * Created by Илья on 18.01.2016.
 */
(function() {
    angular.module('APP').controller("EditItemCtrl", EditItemCtrl);

    EditItemCtrl.$inject = ['$state', 'listItemsService', 'autocompleteService', '$mdToast', '$rootScope', '$timeout', '$window'];

    function EditItemCtrl ($state, listItemsService, autocompleteService, $mdToast, $rootScope, $timeout, $window) {
        var self = this;
        this.id_list = $state.params.id_list;
        this.id_item = $state.params.id_item;
        this.save = save;
        this.goBack = goBack;
	    this.querySearch = querySearch;
        this.product = listItemsService.get({id_list: self.id_list, id_item: self.id_item});
	    focus();

	    function focus() {
		    $timeout(function(){
			    var element = $window.document.getElementById('edit-item-title');
			    if(element) element.focus();
		    });
	    }
        function save(){
	        $rootScope.loading = true;
	        listItemsService.post({id_list: self.id_list, id_item: self.id_item}, self.product, function(data){
		        $rootScope.loading = false;
                if (data.error) {
                    $mdToast.showSimple(data.error);
                } else {
                    goBack();
                }
            });
        }

        function goBack() {
            $state.go('list_items', {id_list: self.id_list});
        }

	    function querySearch(text) {
		    return autocompleteService.query({entity: 'products'}, {text: text}).$promise;
	    }
    };
})();