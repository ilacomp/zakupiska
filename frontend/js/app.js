(function() {
    angular.module('APP', ['ngMaterial', 'ui.router', 'ngResource', 'ngMessages']).
        config(config).
        run(run);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider'];
    function config($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $httpProvider.interceptors.push('httpRequestInterceptor');
        $locationProvider.hashPrefix('!').html5Mode(true);
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state("index", {
                url: "/",
                templateUrl: "views/main.html",
                controller: "IndexCtrl",
                controllerAs: "idx"
                }
            )
            .state("login",
                {
                    url: "/login",
                    templateUrl: "views/login.html",
                    controller: "LoginCtrl",
                    controllerAs: "login"
                }
            )
            .state("register",
                {
                    url: "/register",
                    templateUrl: "views/register.html",
                    controller: "RegisterCtrl",
                    controllerAs: "register"
                }
            )
            .state("lists",
                {
                    url: "/lists",
                    templateUrl: "views/lists.html",
                    controller: "ListsCtrl",
                    controllerAs: "lists"
                }
            )
            .state("newlist",
                {
                    url: "/newlist",
                    templateUrl: "views/newlist.html",
                    controller: "NewListCtrl",
                    controllerAs: "newlist"
                }
            )
            .state("editlist",
                {
                    url: "/editlist/:id_list",
                    templateUrl: "views/editlist.html",
                    controller: "EditListCtrl",
                    controllerAs: "editlist"
                }
            )
            .state("list_items",
                {
                    url: "/lists/:id_list",
                    templateUrl: "views/lists.items.html",
                    controller: "ListItemsCtrl",
                    controllerAs: "listitems"
                }
            )
            .state("newitem",
                {
                    url: "/lists/:id_list/newitem",
                    templateUrl: "views/newitem.html",
                    controller: "NewItemCtrl",
                    controllerAs: "newitem"
                }
            )
            .state("profile",
                    {
                        url: "/profile",
                        templateUrl: "views/profile.html",
                    }
            );
    }

    run.$inject = ['$rootScope', '$state', 'authService', '$location', '$templateCache'];
    function run($rootScope, $state, authService, $location, $templateCache) {
        $rootScope.$on( '$stateChangeStart', redirectToLogin);
        $templateCache.put("mdColorPickerDialog.tpl.html","<md-dialog class=\"md-color-picker-dialog\">\n	<div md-color-picker-container\n		value=\"value\"\n		default=\"{{defaultValue}}\"\n		random=\"{{random}}\"\n		ok=\"ok\"\n		md-color-alpha-channel=\"mdColorAlphaChannel\"\n		md-color-spectrum=\"mdColorSpectrum\"\n		md-color-sliders=\"mdColorSliders\"\n		md-color-generic-palette=\"mdColorGenericPalette\"\n		md-color-material-palette=\"mdColorMaterialPalette\"\n		md-color-history=\"mdColorHistory\"\n		md-color-default-tab=\"mdColorDefaultTab\"\n	></div>\n	<md-actions layout=\"row\">\n		<md-button class=\"md-mini\" ng-click=\"close()\" style=\"width: 50%;\">Отмена</md-button>\n		<md-button class=\"md-mini\" ng-click=\"ok()\" style=\"width: 50%;\">Выбрать</md-button>\n	</md-actions>\n</md-dialog>\n");

        function redirectToLogin (e, toState  , toParams, fromState, fromParams) {
            var isAuthPage = ['login', 'register'].indexOf(toState.name)>=0;
            if (isAuthPage){
                if (authService.isAuth()) {
                    e.preventDefault(); // stop current execution
                    $state.go('index');
                }
            } else {
                // now, redirect only not authenticated
                if(!authService.isAuth()) {
                    e.preventDefault(); // stop current execution
                    $rootScope.redirectURL = $location.url();
                    $state.go('login'); // go to login
                }
            }
        };
    }
})();



