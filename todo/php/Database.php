<?php
class Database {

	public $user = "";
	public $password = "";
	public $host = "";
	public $database = "";

	public $connection = null;
	public $statement = null;

	public function __construct() {

	}

	public function readConfig() {
		$path = dirname(__FILE__) . "/../res/mysql.conf";
		$config = fopen($path, "r") or die("Unable to read config file.");
		$contense = fread($config, filesize($path));

		list($luser, $lpassword, $lhost, $ldatabase) = explode("\n", $contense);
		$this -> user = explode("=", $luser, 2)[1];
		$this -> password = explode("=", $lpassword, 2)[1];
		$this -> host = explode("=", $lhost, 2)[1];
		$this -> database = explode("=", $ldatabase, 2)[1];

		//echo $this -> user . ":" . $this -> password . ":" . $this -> host . ";" . $this -> database;

		fclose($config);
	}

	public function connect() {
		$this -> connection = mysqli_connect($this -> host, $this -> user, $this -> password, $this -> database);
		if($this -> connection -> connect_error) {
			die("Connection failed: " . $this -> connection -> connect_error);
		}
	}

	public function close() {
		$this -> connection -> close();
		if($this -> statement != null) { $this -> statement -> close(); }
		$this -> connection = null;
		$this -> statement = null;
	}

	public function prepare($query) {
		return $this -> statement = $this -> connection -> prepare($query);
	}

}
?>
