(function() {
    angular.module('APP', ['ngMaterial', 'ui.router', 'ngResource']).
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
            .state("list_detail",
                {
                    url: "/lists/:id_list",
                    templateUrl: "views/lists.details.html",
                    controller: "ListDetailCtrl",
                    controllerAs: "listdetail"
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
            .state("profile",
                    {
                        url: "/profile",
                        templateUrl: "views/profile.html",
                    }
            );
    }

    run.$inject = ['$rootScope', '$state', 'authService', '$location'];
    function run($rootScope, $state, authService, $location) {
        // $rootScope.token = $cookies.get('PHPSESSID') || '';
        // $rootScope.user = angular.copy(window.user);
        // delete window.user;
        // $rootScope.$on( '$stateChangeStart', redirectToLogin);
        //
        // function redirectToLogin (e, toState  , toParams, fromState, fromParams) {
        //     var isAuthPage = ['login', 'register'].indexOf(toState.name)>=0;
        //     if (isAuthPage){
        //         if ($rootScope.user.authorized) {
        //             e.preventDefault(); // stop current execution
        //             $state.go('index');
        //         }
        //     } else {
        //         // now, redirect only not authenticated
        //         if(!$rootScope.user.authorized) {
        //             e.preventDefault(); // stop current execution
        //             $rootScope.redirectURL = $location.url();
        //             $state.go('login'); // go to login
        //         }
        //     }
        // };
    }
})();



