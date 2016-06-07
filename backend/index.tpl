<!DOCTYPE html>
<html lang="en" ng-app="APP">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1, user-scalable=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="/img/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="96x96" href="/img/favicon-96x96.png">
    <link rel="apple-touch-icon-precomposed" sizes="96x96" href="/img/favicon-96x96.png">
    <meta name="mobile-web-app-capable" content="yes">
    <base href="/index.html" />
    <title>ЗакуПиська</title>

    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!-- Bootstrap core CSS -->
    <link href="/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="/css/toaster.min.css" rel="stylesheet">
    <link href="/css/main.css" rel="stylesheet">
    <link href="/css/animations.css" rel="stylesheet">

    <!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>-->
</head>

<body ng-controller="IndexCtrl as idx">

<!-- Fixed navbar -->
<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container">
        <div class="navbar-header">
            <button type="button" ng-init="navCollapsed = true" ng-click="navCollapsed = !navCollapsed" class="navbar-toggle">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/" ng-click="navCollapsed=true;">ЗакуПиська</a>
        </div>
        <div uib-collapse="navCollapsed" class="navbar-collapse collapse">
            <ul class="nav navbar-nav navbar-right" ng-click="navCollapsed = true">
                <li><a href="/lists">Покупки</a></li>
                <li><a href="/friends">Друзья</a></li>
                <li><a href="/profile">Профиль</a></li>
                <li><a href="/about">О программе</a></li>
                <li ng-show="user.authorized"><a href="" ng-click="idx.logout()">Выйти</a></li>
                <li ng-show="!user.authorized"><a href="/login">Войти</a></li>
            </ul>
        </div><!--/.nav-collapse -->
    </div>
</div>

<div class="container">
    <div class="mainview" ui-view></div>
</div>

<script src="/libs/angular.js"></script>
<script src="/libs/angular-animate.js"></script>
<script src="/libs/toaster.min.js"></script>
<script src="/libs/angular-ui-router.js"></script>
<script src="/libs/angular-cookies.js"></script>
<script src="/libs/angular-resource.js"></script>
<script src="/libs/ui-bootstrap-tpls-1.0.0.js"></script>
<script src="/js/app.js"></script>
<script src="/js/services/authService.js"></script>
<script src="/js/services/listService.js"></script>
<script src="/js/services/requestIntercepterService.js"></script>
<script src="/js/controllers/IndexCtrl.js"></script>
<script src="/js/controllers/LoginCtrl.js"></script>
<script src="/js/controllers/RegisterCtrl.js"></script>
<script src="/js/controllers/ListsCtrl.js"></script>
<script src="/js/controllers/NewListCtrl.js"></script>
<script src="/js/controllers/ListDetailCtrl.js"></script>
<script>
    var user = %_USER_%;
</script>
</body>
</html>