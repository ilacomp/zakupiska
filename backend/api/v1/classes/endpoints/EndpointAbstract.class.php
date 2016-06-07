<?php

/**
 * Created by PhpStorm.
 * User: iyudin
 * Date: 07.06.2016
 * Time: 17:16
 */
abstract class EndpointAbstract
{
    protected $api;

    public function __construct(&$api) {
        $this->api = $api;
    }
    
    abstract function processAPI();
}