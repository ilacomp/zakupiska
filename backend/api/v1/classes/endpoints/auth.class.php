<?php

/**
 * Created by PhpStorm.
 * User: iyudin
 * Date: 07.06.2016
 * Time: 17:28
 */
require_once 'EndpointAbstract.class.php';
class Endpoint extends EndpointAbstract
{
    public function processAPI()
    {
        switch ($this->api->verb) {
            case 'login':
                if ($this->api->User->login($this->api->args['username'], $this->api->args['password'])) {
                    return array(
                        'user' => $this->api->User->getUserInfo(),
                        'token' => session_id(),
                    );
                } else {
                    return array(
                        'error' => $this->api->User->error
                    );
                }
                break;
            case 'logout':
                $this->api->User->logout();
                return array(
                    'user' => $this->api->User->getUserInfo()
                );
                break;
            case 'register':
                if ($this->api->User->register($this->api->args['username'], $this->api->args['email'], $this->api->args['pass1'], $this->api->args['pass2']))
                    return array(
                        'user' => $this->api->User->getUserInfo(),
                        'token' => session_id(),
                    );
                else {
                    return array(
                        'error' => $this->api->User->error
                    );
                }
            case '':
                if ($this->api->method == 'GET') {
                    return array(
                        'user' => $this->api->User->getUserInfo()
                    );
                }
                break;
        }

    }
}