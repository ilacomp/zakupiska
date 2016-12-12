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
    private $id_user;

    public function processAPI()
    {
        $this->api->exitIfUnauthorized();
        list($this->id_user) = $this->api->args;
        switch ($this->api->method) {
	        case 'GET':
		        if ( empty($this->id_user) ) {
			        return $this->getFriends();
		        } else {
			        return $this->getFriend();
		        }
	        	break;
	        case 'POST':
		        return $this->searchFriend();
	        	break;
	        case 'PUT':
		        return $this->addFriend();
	        	break;
	        case 'DELETE':
	        	return $this->deleteFriend();
	        	break;
        }
    }

    //Выполняем запрос GET /friends
    private function getFriends() {
        //Получить спискок друзей
        $rs = $this->api->db->prepare("
			SELECT u.id_user, u.email, u.username
			FROM users u, friends f
			WHERE f.id_user = ? AND u.id_user = f.id_friend");
        $rs->execute(array($this->api->User->getId()));
        $friends = $rs->fetchAll(PDO::FETCH_ASSOC);
        return $friends;
    }

	//Выполняем запрос DELETE /friends/:id_user
	private function deleteFriend() {
		if ( empty($this->id_user) ) {
			return array('error'=>'Ошибка при удалении пользователя');
		}
		$rs = $this->api->db->prepare("DELETE FROM friends WHERE (id_user = ? AND id_friend = ?) OR (id_user = ? AND id_friend = ?)");
		if($rs->execute(array( $this->api->User->getId(), $this->id_user, $this->id_user, $this->api->User->getId() ))) {
			return true;
		} else {
			return array('error'=>'Ошибка при удалении друга');
		}
	}

	//Выполняем запрос POST /friends
	private function searchFriend() {
    	$text = $this->api->args['text'].'%';
		$rs = $this->api->db->prepare("
			SELECT id_user, email, username
			FROM users
			WHERE id_user NOT IN (SELECT id_friend FROM friends WHERE id_user = ?) AND (username LIKE ? OR email LIKE ?)");
		$rs->execute(array($this->api->User->getId(), $text, $text));
		$users = $rs->fetchAll(PDO::FETCH_ASSOC);
		return $users;
	}

	//Выполняем запрос PUT /friends
	private function addFriend() {
    	$id_user = $this->api->args['id_user'];
		if ( empty($id_user) ) {
			return array('error'=>'Ошибка при добавлении пользователя');
		}
		$rs = $this->api->db->prepare("INSERT INTO friends (id_user, id_friend) VALUES (?, ?), (?, ?)");
		if($rs->execute(array( $this->api->User->getId(), $id_user, $id_user, $this->api->User->getId() ))) {
			return true;
		} else {
			return array('error'=>'Ошибка при добавлении друга');
		}
	}
}