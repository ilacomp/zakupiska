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
	private $photo;
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
		$this->photo = '';
		$this->userTable = Config::get('db_prefix').'users';
		$this->db = DB::getInstance();
	}

	function loadById($id_user) {
		$rs = $this->db->prepare("SELECT id_user, username, email, phone, photo FROM ".$this->userTable." WHERE id_user=? LIMIT 1");
		$rs->execute(array($id_user));

		if($row = $rs->fetch(PDO::FETCH_ASSOC)) {
			$this->username = $row['username'];
			$this->id_user = $row['id_user'];
			$this->email = $row['email'];
			$this->phone = $row['phone'];
			$this->photo = $row['photo'];
			return true;
		}
		else {
			return false;
		}

	}


	function login($email, $password) {
		if(empty($email) || empty($password)) {
			$this->error = 'Введите имя пользователя и пароль';
			return false;
		}

		$rs = $this->db->prepare("SELECT id_user, username, email, phone, photo FROM ".$this->userTable." WHERE email=? AND password=? LIMIT 1");
		$rs->execute(array($email, md5($password)));

		if($row = $rs->fetch(PDO::FETCH_ASSOC)) {
			$this->username = $row['username'];
			$this->id_user = $row['id_user'];
			$this->email = $row['email'];
			$this->phone = $row['phone'];
			$this->photo = $row['photo'];
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
		$upload_dir = __DIR__.'/../../../img/photos';
		//Upload file
		$photo = $this->photo;
		if (!empty($_FILES['photo'])) {
			$path_parts = pathinfo($_FILES['photo']['name']);
			$filename = $this->id_user . '-' . time() . '.' . $path_parts['extension'];
			if (!file_exists($upload_dir)) mkdir($upload_dir, 0777);
			move_uploaded_file($_FILES['photo']['tmp_name'], $upload_dir.'/'.$filename);
			$photo = $filename;
		}
		if (empty($password)) {
            $rs = $this->db->prepare("UPDATE ".$this->userTable." SET username=?, email=?, phone=?, photo=? WHERE id_user=? LIMIT 1");
            $res = $rs->execute(array($username, $email, $phone, $photo, $this->id_user));
        } else {
            $rs = $this->db->prepare("UPDATE ".$this->userTable." SET username=?, email=?, phone=?, photo=?, password=? WHERE id_user=? LIMIT 1");
		    $res = $rs->execute(array($username, $email, $phone, $photo, md5($password), $this->id_user));
        }

        if (!empty($this->photo)) {
			@unlink($upload_dir.'/'.$this->photo);
        }

		if ($res) {
			$this->username = $username;
			$this->email = $email;
			$this->phone = $phone;
			$this->photo = $photo;
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
			'photo' => $this->photo,
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