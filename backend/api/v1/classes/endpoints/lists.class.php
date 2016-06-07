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
        $this->api->exitIfUnauthorized();
        if (empty($this->api->verb)) {
            //Выполняем запрос /lists
            switch($this->api->method) {
                case 'GET':
                    $rs = $this->api->db->prepare("SELECT lists.* FROM lists, user_lists WHERE user_lists.id_user = ? AND lists.id_list = user_lists.id_list");
                    $rs->execute(array($this->api->User->getId()));
                    $list = $rs->fetchAll(PDO::FETCH_ASSOC);
                    return $list;
                    break;
                case 'PUT':
                    $rs = $this->api->db->prepare("INSERT INTO lists (title, color) VALUES (?,?)");
                    if ( $rs->execute(array($this->api->args['title'], $this->api->args['color'])) ) {
                        $id_list = $this->api->db->lastInsertId();
                        $rs = $this->api->db->prepare("INSERT INTO user_lists (id_list, id_user) VALUES (?,?)");
                        if ( $rs->execute(array($id_list, $this->api->User->getId())) ) {
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