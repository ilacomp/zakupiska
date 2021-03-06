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
        list($this->id_list, $this->id_item) = $this->api->args;
        if ($this->api->verb == 'copy') {
            return $this->copyList();
        } elseif ( empty($this->id_list) ) {
            //Выполняем запрос к /lists
            return $this->processLists();
        } else {
            if (empty($this->id_item)) {
                //Выполняем запрос к /lists/:id_list
                return $this->processList();
            }
            else {
                //Выполняем запрос к /lists/:id_list/:id_item
                return $this->processOneItem();
            }
        }

    }

    //Выполняем запрос к /lists
    private function processLists() {
        switch($this->api->method) {
            case 'GET': //Получить списки покупок
                $rs = $this->api->db->prepare("
                  SELECT lists.*, COUNT(items.id_item) as total, COUNT(IF(items.checked='1',1,NULL)) as checked, user_lists.rights
                  FROM lists LEFT JOIN items ON items.id_list = lists.id_list, user_lists 
                  WHERE user_lists.id_user = ? AND lists.id_list = user_lists.id_list GROUP BY id_list");
                $rs->execute(array($this->api->User->getId()));
                $list = $rs->fetchAll(PDO::FETCH_ASSOC);
                return $list;
                break;
            case 'PUT': //Создать список покупок
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
    }

    //Выполняем запрос к /lists/:id_list
    private function processList() {
        $list = $this->getCurrentList();
        switch($this->api->method) {
            case 'GET': //Получить список
                $rs = $this->api->db->prepare("SELECT items.* FROM items, user_lists WHERE items.id_list = ? AND user_lists.id_list=items.id_list AND user_lists.id_user=? ");
                $rs->execute(array($this->id_list, $this->api->User->getId()));
                $items = $rs->fetchAll(PDO::FETCH_ASSOC);
                return array('list'=>$list, 'items'=>$items);
                break;
            case 'POST': //Сохранить список
                if ($list['rights'] !== 'owner') throw new Exception ('Forbidden', 403);
                $rs = $this->api->db->prepare("UPDATE lists SET title=?, color=? WHERE id_list=?");
                if ( $rs->execute(array($this->api->args['title'], $this->api->args['color'], $this->id_list)) ) {
                    return true;
                } else {
                    return array('error'=>'Ошибка при сохранении списка');
                }
                break;
            case 'PUT': //Добавить товар в список
                if ($list['rights'] !== 'owner') throw new Exception ('Forbidden', 403);
                $rs = $this->api->db->prepare("INSERT INTO items (id_list, title, amount) VALUES (?, ?, ?)");
                if ( $rs->execute(array($this->id_list, $this->api->args['title'], $this->api->args['amount'])) ) {
                    $id_item = $this->api->db->lastInsertId();
                    $this->addProductToCatalog($this->api->args['title']);
                    return array('id_item' => $id_item);
                } else {
                    return array('error'=>'Ошибка при создании товара');
                }
                break;
            case 'DELETE': //Удалить список
                if ($list['rights'] !== 'owner') throw new Exception ('Forbidden', 403);
                $rs = $this->api->db->prepare("DELETE lists FROM lists, user_lists WHERE lists.id_list = ? AND user_lists.id_user = ? AND lists.id_list = user_lists.id_list");
                if($rs->execute(array( $this->id_list, $this->api->User->getId() ))) {
                    return true;
                } else {
                    return array('error'=>'Ошибка при удалении списка');
                }
                break;
        }
    }

    //Выполняем запрос к /lists/:id_list/:id_item
    private function processOneItem() {
        $list = $this->getCurrentList();
        switch($this->api->method) {
            case 'DELETE':
                if ($list['rights'] !== 'owner') throw new Exception ('Forbidden', 403);
                $rs = $this->api->db->prepare("DELETE items FROM items, user_lists WHERE items.id_item = ? AND user_lists.id_list=items.id_list AND user_lists.id_user=?");
                if($rs->execute(array( $this->id_item, $this->api->User->getId() ))) {
                    return true;
                } else {
                    return array('error'=>'Ошибка при удалении товара');
                }
                break;
            case 'GET':
                $rs = $this->api->db->prepare("SELECT items.* FROM items, user_lists WHERE items.id_list = ? AND items.id_item=? AND user_lists.id_list=items.id_list AND user_lists.id_user=? ");
                $rs->execute(array($this->id_list, $this->id_item, $this->api->User->getId()));
                $item = $rs->fetch(PDO::FETCH_ASSOC);
                return $item;
                break;
            case 'POST':
                $rs = $this->api->db->prepare("UPDATE items SET title=?, amount=?, checked=? WHERE id_item=?");
                if ( $rs->execute(array($this->api->args['title'], $this->api->args['amount'], $this->api->args['checked'], $this->id_item)) ) {
	                $this->addProductToCatalog($this->api->args['title']);
                    return true;
                } else {
                    return array('error'=>'Ошибка при сохранении товара');
                }
                break;
        }
    }

    private function getCurrentList() {
        $rs = $this->api->db->prepare("SELECT lists.*, user_lists.rights FROM lists, user_lists WHERE lists.id_list=? AND user_lists.id_user = ? AND lists.id_list = user_lists.id_list");
        $rs->execute(array( $this->id_list, $this->api->User->getId() ));
        $list = $rs->fetch(PDO::FETCH_ASSOC);
        if (empty($list)) {
            throw new Exception ('Not Found', 404);
        } else {
            return $list;
        }
    }

    private function copyList() {
        $this->id_list = $this->api->args['id'];
        $list = $this->getCurrentList();
        if ($list['rights'] !== 'owner') throw new Exception ('Forbidden', 403);
        $rs = $this->api->db->prepare("INSERT INTO lists (color, title) (SELECT color, CONCAT(title, ' (копия)') as title FROM lists WHERE id_list=?)");
        if ($rs->execute(array( $this->id_list))) {
            $new_list = $this->api->db->lastInsertId();
            $rs = $this->api->db->prepare("INSERT INTO user_lists (id_list, id_user) VALUES (?,?)");
            if ( $rs->execute(array($new_list, $this->api->User->getId())) ) {
                $rs = $this->api->db->prepare("INSERT INTO items (amount, title, id_list) (SELECT amount, title, ? as id_list FROM items WHERE id_list = ?)");
                $rs->execute(array($new_list, $this->id_list));
                return array('id_list' => $new_list);
            } else {
                return array('error'=>'Ошибка при создании списка');
            }
        } else {
            return array('error'=>'Ошибка при создании списка');
        }
    }

    private function addProductToCatalog($title) {
	    //Вставка товара в справочник
	    $rs = $this->api->db->prepare("INSERT INTO products_catalog (title) VALUES (?)");
	    $rs->execute(array($title));

    }
}