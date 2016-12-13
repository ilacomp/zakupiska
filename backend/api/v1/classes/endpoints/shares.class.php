<?php
/**
 * Created by PhpStorm.
 * User: iyudin
 * Date: 13.12.2016
 * Time: 17:28
 */
require_once 'EndpointAbstract.class.php';
class Endpoint extends EndpointAbstract
{
    private $id_list;
    private $id_user;

    public function processAPI()
    {
        $this->api->exitIfUnauthorized();
        list($this->id_list, $this->id_user) = $this->api->args;
        $this->exitIfNoRights();
        switch ($this->api->method) {
	        case 'GET':
		        return $this->getShares();
		        break;
	        case 'PUT':
		        return $this->addShare();
	        	break;
	        case 'DELETE':
	        	return $this->deleteShare();
	        	break;
        }
    }
    // Проверка наличия прав на список
    private function exitIfNoRights() {
    	if (!empty($this->id_list)) {
		    $rs = $this->api->db->prepare("SELECT COUNT(*) cnt FROM user_lists WHERE id_list = ? AND id_user = ? AND rights = 'owner'");
		    $rs->execute(array($this->id_list, $this->api->User->getId()));
		    if($row = $rs->fetch(PDO::FETCH_ASSOC)) {
			    if ($row['cnt'] > 0) return;
		    }
	    }
	    throw new Exception ('Forbidden', 403);
    }

	//Выполняем запрос DELETE /shares/:id_list/:id_user
	private function deleteShare() {
		if ( empty($this->id_user) || empty($this->id_list) ) {
			return array('error'=>'Ошибка при удалении списка');
		}
		$rs = $this->api->db->prepare("DELETE FROM user_lists WHERE id_list = ? AND id_user = ?");
		if($rs->execute(array( $this->id_list, $this->id_user ))) {
			return true;
		} else {
			return array('error'=>'Ошибка при удалении списка');
		}
	}

	//Выполняем запрос GET /shares/:id_list
	private function getShares() {
		$rs = $this->api->db->prepare("
			SELECT users.id_user, users.email, users.username
			FROM users, user_lists
			WHERE user_lists.id_list = ? AND users.id_user = user_lists.id_user");
		$rs->execute(array($this->id_list));
		$users = $rs->fetchAll(PDO::FETCH_ASSOC);
		return $users;
	}

	//Выполняем запрос PUT /shares/:id_list
	private function addShare() {
    	$id_user = $this->api->args['id_user'];
		if ( empty($id_user) ) {
			return array('error'=>'Ошибка при добавлении прав пользователя');
		}
		$rs = $this->api->db->prepare("INSERT INTO user_lists (id_list, id_user, rights) VALUES (?, ?, 'readonly')");
		if($rs->execute(array( $this->id_list, $id_user ))) {
			return true;
		} else {
			return array('error'=>'Ошибка при добавлении прав пользователя');
		}
	}
}