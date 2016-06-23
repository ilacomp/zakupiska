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
    private $id_list;
    private $id_item;

    public function processAPI()
    {
        $this->api->exitIfUnauthorized();
        if (empty($this->api->args[0])) {
            //Выполняем запрос к /lists
            return $this->processList();
        } else {
            $this->id_list = array_shift($this->api->args);
            if (empty($this->api->args[0])) {
                //Выполняем запрос к /lists/:id_list
                return $this->processList();
            }
            elseif ($this->api->args[0]=='items') {
                array_shift($this->api->args);
                if (empty($this->api->args[0])) {
                    //Выполняем запрос к /lists/:id_list/items
                    return $this->processItems();
                } else {
                    //Выполняем запрос к /lists/:id_list/items/:id_item
                    $this->id_item = array_shift($this->api->args);
                    return $this->processOneItem();
                }
            }
        }

    }

    //Выполняем запрос к /lists
    private function processList() {
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
            case 'DELETE':
                $rs = $this->api->db->prepare("DELETE lists FROM lists, user_lists WHERE lists.id_list = ? AND user_lists.id_user = ? AND lists.id_list = user_lists.id_list");
                if($rs->execute(array( $this->id_list, $this->api->User->getId() ))) {
                    return true;
                } else {
                    return array('error'=>'Ошибка при удалении списка');
                }
                break;
        }
    }

    //Выполняем запрос к /lists/:id_list/items
    private function processItems() {
        switch($this->api->method) {
            case 'GET':
                $rs = $this->api->db->prepare("SELECT items.* FROM items, user_lists WHERE items.id_list = ? AND user_lists.id_list=items.id_list AND user_lists.id_user=? ");
                $rs->execute(array($this->id_list, $this->api->User->getId()));
                $items = $rs->fetchAll(PDO::FETCH_ASSOC);
                return $items;
                break;
            case 'PUT':
                $rs = $this->api->db->prepare("INSERT INTO items (id_list, title, amount) VALUES (?, ?, ?)");
                if ( $rs->execute(array($this->id_list, $this->api->args['title'], $this->api->args['amount'])) ) {
                    $id_item = $this->api->db->lastInsertId();
                    return array('id_item' => $id_item);
                } else {
                    return array('error'=>'Ошибка при создании товара');
                }
                break;
        }
    }

    //Выполняем запрос к /lists/:id_list/items/:id_item
    private function processOneItem() {
        switch($this->api->method) {
            case 'DELETE':
                $rs = $this->api->db->prepare("DELETE items FROM items, user_lists WHERE items.id_item = ? AND user_lists.id_list=items.id_list AND user_lists.id_user=?");
                if($rs->execute(array( $this->id_item, $this->api->User->getId() ))) {
                    return true;
                } else {
                    return array('error'=>'Ошибка при удалении товара');
                }
                break;
        }
    }

}