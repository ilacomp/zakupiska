<?php
/**
 * Created by PhpStorm.
 * User: ILA
 * Date: 14.03.2015
 * Time: 10:35
 */

class Config {
    private static $config = null;

    private static function autoloadConfig() {
        if (!is_null(self::$config)) return;
        $data = array();
        include( __DIR__.'/config.php' );
        self::$config = $data;
    }

    public static function get($option=null, $default=null) {
        self::autoloadConfig();
        if ( is_null($option) ) return self::$config; //Return all config data
        return isset(self::$config[$option])?  self::$config[$option] : $default;
    }

    public static function set($param_name, $param_value) {
        self::autoloadConfig();
        self::$config[$param_name] = $param_value;
    }

    public static function delete($param_name) {
        self::autoloadConfig();
        unset(self::$config[$param_name]);
    }

    public static function save() {
        self::autoloadConfig();
        file_put_contents( self::$config_file, '<?php ' . PHP_EOL . '$data=' . var_export(self::$config, true) . ';' );
    }

}