/**
 * Created by Илья on 18.01.2016.
 */
(function() {
    angular.module('APP').controller("NewItemCtrl", NewItemCtrl);

    NewItemCtrl.$inject = ['$state', '$window', 'listItemsService', 'autocompleteService', '$mdToast', '$rootScope', '$timeout'];

    function NewItemCtrl ($state, $window, listItemsService, autocompleteService, $mdToast, $rootScope, $timeout) {
        var self = this;
        var defaultProduct = {
            title: '',
            amount: ''
        };
        this.product = angular.copy(defaultProduct);
        this.id_list = $state.params.id_list;
        this.add = add;
        this.addReturn = addReturn;
        this.goBack = goBack;
        this.querySearch = querySearch;
        focus();

        function focus() {
	        $timeout(function(){
		        var element = $window.document.getElementById('new-item-title');
		        if(element) element.focus();
            });
        }

        function add(){
	        $rootScope.loading = true;
            listItemsService.put({id_list: self.id_list}, self.product, function(data){
	            $rootScope.loading = false;
                if (data.error) {
                    $mdToast.showSimple(data.error);
                } else {
                    self.product = angular.copy(defaultProduct);
                    focus();
                }
            });

        }

        function addReturn(){
	        $rootScope.loading = true;
	        listItemsService.put({id_list: self.id_list}, self.product, function(data){
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
		    return autocompleteService.query({entity: 'products'}, {text: text});
	    }
    };
})();