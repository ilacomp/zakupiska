/* Auth Services */
(function() {
    angular.module('APP').factory('authService', authService);

    authService.$inject = ['$resource', '$window', '$injector'];

    function authService($resource, $window, $injector) {
        var self = this;
        init();

        return {
            checkAuth: checkAuth,
            login: login,
            logout: logout,
            register: register,
            isAuth: isAuth,
            getToken: getToken,
            getUser: getUser,
            updateUser: updateUser
        };

        function isAuth(){
            return self.user.authorized;
        }
        function setUser(newUser){
            self.user = newUser;
            $window.localStorage.setItem('user', JSON.stringify(newUser));
        }

        function getUser() {
            return self.user;
        }

        function updateUser(params, successCallback, errorCallback) {
            self.resource.update(params, function(data){
                if (data.error){
                    errorCallback(data.error);
                } else {
                    setUser(data.user);
                    setToken(data.token);
                    successCallback()
                }
            });
        }

        function setToken(newToken){
            self.token = newToken;
            $window.localStorage.setItem('token', newToken);
        }

        function getToken() {
            return self.token;
        }

        function login(params, successCallback, errorCallback){
            self.resource.login(params, function(data){
                if (data.error){
                    errorCallback(data.error);
                } else {
                    setUser(data.user);
                    setToken(data.token);
                    successCallback()
                }
            });
        }

        function register(params, successCallback, errorCallback){
            self.resource.register(params, function(data){
                if (data.error){
                    errorCallback(data.error);
                } else {
                    setUser(data.user);
                    setToken(data.token);
                    successCallback()
                }
            });
        }

        function logout(callback){
            self.resource.logout(function(data){
                if (data.user){
                    setUser(data.user);
                    setToken('');
                }
                callback();
            });
        }

        function checkAuth() {
            self.resource.checkAuth(function(data){
                if (data.user){
                    setUser(data.user);
                    if (!data.user.authorized){
                        var $state = $injector.get('$state');
                        $state.go('login');
                    }
                }
            });
        }

        function init() {
            var defaultUser = {
                'id_user': -1,
                'username': '',
                'email': '',
                'phone': '',
                'authorized': false
            };
            setUser($window.localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : defaultUser);
            setToken($window.localStorage.getItem('token') || '');

            self.resource = $resource('/api/v1/auth/:action', {action: '', token: self.token}, {
                checkAuth: {method: 'get'},
                login: {method: 'post', params: {action: 'login'}},
                logout: {method: 'post', params: {action: 'logout'}},
                register: {method: 'post', params: {action: 'register'}},
                update: {method: 'post', params: {action: 'update'}}
            });
            checkAuth();
        }
    };
})();