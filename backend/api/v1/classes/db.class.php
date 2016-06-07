<?php
/**
 * Created by PhpStorm.
 * User: ILA
 * Date: 14.03.2015
 * Time: 10:35
 */
require_once ('config.class.php');
class DB {
    protected static $db = null;

    public static function getInstance() {
        if (is_null(self::$db)) {
            try
            {
                self::$db = new PDO(
                    'mysql:dbname=' . Config::get('db_name') . ';host=' . Config::get('db_host'),
                    Config::get('db_user'),
                    Config::get('db_password'),
                    array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8')
                );
            }
            catch (PDOException $ex)
            {
                die('DB connection failed');
            }
        }
        return self::$db;
    }

    private function __construct() {}
    private function __clone() {}
    private function __wakeup() {}
}