<?php
/**
 * Created by PhpStorm.
 * User: Ilya Yudin <iyudin@solovat.net>
 * Date: 21.01.2016
 * Time: 11:40
 */
session_start();
$classDir = __DIR__.'/api/v1/classes';
require_once $classDir. '/config.class.php';
require_once $classDir. '/db.class.php';
require_once $classDir. '/user.class.php';
$User = new User(true);
$info = $User->getUserInfo();
$html = file_get_contents('index.tpl');
$html = str_replace('%_USER_%', json_encode($info), $html);
echo $html;