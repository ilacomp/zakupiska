<?php

/**
 * Created by PhpStorm.
 * User: Ilya Yudin <iyudin@solovat.net>
 * Date: 18.01.2016
 * Time: 13:38
 */
require_once 'API.class.php';
require_once 'config.class.php';
require_once 'db.class.php';
require_once 'user.class.php';
class APIv1 extends API
{
    protected $User;
    protected $db;

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

    protected function exitIfUnauthorized(){
        if (!$this->User->authorized()) {
            throw new Exception ('Forbidden', 403);
        }
    }

    protected function auth($args){
        switch ($this->verb) {
            case 'login':
                    if ($this->User->login($args['username'], $args['password'])) {
                        return array(
                            'user' => $this->User->getUserInfo(),
                            'token' => session_id(),
                        );
                    } else {
                        return array(
                            'error' => $this->User->error
                        );
                    }
                break;
            case 'logout':
                $this->User->logout();
                return $this->User->getUserInfo();
                break;
            case 'register':
                if ($this->User->register($args['username'], $args['email'], $args['pass1'], $args['pass2']))
                    return array(
                        'user' => $this->User->getUserInfo(),
                        'token' => session_id(),
                    );
                else {
                    return array(
                        'error' => $this->User->error
                    );
                }
            case '':
                if ($this->method == 'GET') {
                    return $this->User->getUserInfo();
                }
                break;
        }
    }

    protected function lists($args) {
        $this->exitIfUnauthorized();
        if (empty($this->verb)) {
            //Выполняем запрос /lists
            switch($this->method) {
                case 'GET':
                    $rs = $this->db->prepare("SELECT lists.* FROM lists, user_lists WHERE user_lists.id_user = ? AND lists.id_list = user_lists.id_list");
                    $rs->execute(array($this->User->getId()));
                    $list = $rs->fetchAll(PDO::FETCH_ASSOC);
                    return $list;
                    break;
                case 'PUT':
                    $rs = $this->db->prepare("INSERT INTO lists (title, color) VALUES (?,?)");
                    if ( $rs->execute(array($args['title'], $args['color'])) ) {
                        $id_list = $this->db->lastInsertId();
                        $rs = $this->db->prepare("INSERT INTO user_lists (id_list, id_user) VALUES (?,?)");
                        if ( $rs->execute(array($id_list, $this->User->getId())) ) {
                            return array('id_list' => $id_list);
                        } else {
                            return array('error'=>'Ошибка при создании списка');
                        }
                    } else {
                        return array('error'=>'Ошибка при создании списка');
                    }
                    break;
            }
        } else {

        }
    }
}