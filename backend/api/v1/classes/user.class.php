<?php
/**
 * Created by PhpStorm.
 * User: ILA
 * Date: 16.03.2015
 * Time: 15:03
 */
require_once __DIR__.'/db.class.php';

class User {
	private $id_user;
	private $username;
	private $email;
	private $phone;
	private $db;
	private $userTable;
	private $session_var = 'id_user';
	public  $error='';

	function __construct($autoload=false) {
		$this->init();
		if ( $autoload && isset($_SESSION[$this->session_var]) ){
			$this->loadById($_SESSION[$this->session_var]);
		}
	}

	private function init(){
		$this->id_user = -1;
		$this->username = '';
		$this->email = '';
		$this->phone = '';
		$this->userTable = Config::get('db_prefix').'users';
		$this->db = DB::getInstance();
	}

	function loadById($id_user) {
		$rs = $this->db->prepare("SELECT id_user, username, email, phone FROM ".$this->userTable." WHERE id_user=? LIMIT 1");
		$rs->execute(array($id_user));

		if($row = $rs->fetch(PDO::FETCH_ASSOC)) {
			$this->username = $row['username'];
			$this->id_user = $row['id_user'];
			$this->email = $row['email'];
			$this->phone = $row['phone'];
			return true;
		}
		else {
			return false;
		}

	}


	function login($username, $password) {
		if(empty($username) || empty($password)) {
			$this->error = 'Введите имя пользователя и пароль';
			return false;
		}

		$rs = $this->db->prepare("SELECT id_user, username, email, phone  FROM ".$this->userTable." WHERE username=? AND password=? LIMIT 1");
		$rs->execute(array($username, md5($password)));

		if($row = $rs->fetch(PDO::FETCH_ASSOC)) {
			$this->username = $row['username'];
			$this->id_user = $row['id_user'];
			$this->email = $row['email'];
			$this->phone = $row['phone'];
			$_SESSION[$this->session_var] = $this->id_user;
			return true;
		}
		else {
			$this->error = 'Неверное имя пользователя или пароль';
			return false;
		}
	}

	function register($username, $email, $password, $password2) {
		if(empty($email) || empty($password) || empty($username) || $password!==$password2) {
			$this->error = 'Введите имя пользователя и пароль';
			return false;
		}

		$rs = $this->db->prepare("INSERT INTO ".$this->userTable." (username, email, password) VALUES (?, ?, ?)");

		if( $rs->execute(array($username, $email, md5($password))) ) {
			$this->username = $username;
			$this->email = $email;
			$this->id_user  = $this->db->lastInsertId();
			$_SESSION[$this->session_var] = $this->id_user;
			return true;
		}
		else {
			$this->error = 'Не удалось зарегистрировать пользователя. Возможно пользователь с таким именем уже зарегистрирован.';
			return false;
		}
	}

	function update($username, $email, $phone, $password, $password2) {
		if(empty($email) || empty($username)) {
			$this->error = 'Введите имя пользователя и email';
			return false;
		}

		if(!empty($password) || !empty($password2) || $password!==$password2) {
			$this->error = 'Пароли не совпадают';
			return false;
		}

		if (empty($password)) {
            $rs = $this->db->prepare("UPDATE ".$this->userTable." SET username=?, email=?, phone=? WHERE id_user=? LIMIT 1");
            $res = $rs->execute(array($username, $email, $phone, $this->id_user));
        } else {
            $rs = $this->db->prepare("UPDATE ".$this->userTable." SET username=?, email=?, phone=?, password=? WHERE id_user=? LIMIT 1");
		    $res = $rs->execute(array($username, $email, $phone, md5($password), $this->id_user));
        }

		if ($res) {
			$this->username = $username;
			$this->email = $email;
			$this->phone = $phone;
			return true;
		}
		else {
			$this->error = 'Не удалось обновить данные пользователя. Возможно пользователь с таким именем уже зарегистрирован.';
			return false;
		}
	}

	function getUserInfo() {
		$data = array(
			'id_user' => $this->id_user,
			'username' => $this->username,
			'email' => $this->email,
			'phone' => $this->phone,
			'authorized' => $this->authorized()
		);
		return $data;
	}

	function getId() {
		return $this->id_user;
	}

	function logout() {
		$this->init();
		unset($_SESSION[$this->session_var]);
		session_destroy();
	}

	function authorized(){
		return $this->id_user > 0;
	}
}