<?php

/**
 * Created by PhpStorm.
 * User: Ilya Yudin <ila.comp@gmail.com>
 * Date: 18.01.2016
 * Time: 13:38
 */
require_once 'API.class.php';
require_once 'config.class.php';
require_once 'db.class.php';
require_once 'user.class.php';
class APIv1 extends API
{
    public $User;
    public $db;

    public function __construct($request, $origin) {
        parent::__construct($request);
        $this->db = DB::getInstance();

        if (isset($this->request['token'])) {
            session_id($this->request['token']);
        }
        session_start();
        $this->loadUser();
    }

    protected function loadUser() {
        $this->User = new User(true);
    }

    public function exitIfUnauthorized(){
        if (!$this->User->authorized()) {
            throw new Exception ('Forbidden', 403);
        }
    }

    public function processAPI() {
        $endpointFile = __DIR__."/endpoints/$this->endpoint.class.php";
        if (file_exists($endpointFile)) {
            try {
                require_once ($endpointFile);
                $endpoint = new Endpoint($this);
                return $this->_response($endpoint->processAPI());
            }
            catch (Exception $e) {
                return $this->_response($e->getMessage(), $e->getCode());
            }

        }
        return $this->_response("No Endpoint: $this->endpoint", 404);
    }
    
}