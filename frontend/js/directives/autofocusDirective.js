/**
 * Created by ILA on 12.12.2016.
 */
(function() {
    angular.module('APP').directive("autofocus", autofocusDirective);

    autofocusDirective.$inject = ['$timeout'];

    function autofocusDirective ($timeout) {
        return {
            restrict: 'A',
            link : function($scope, $element) {
                $timeout(function() {
                    $element[0].focus();
                }, 0);
            }
        }
    };
})();