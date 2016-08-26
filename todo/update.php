<?php
include_once 'php/Database.php';
session_start();

$error = "&nbsp;";//Non breaking space

if($_SERVER['REQUEST_METHOD'] == "POST") {
	if(!isSet($_POST['name']) || !isSet($_POST['content'])) {
		echo "Error 1";
		exit;
	}
	$name = $_POST['name'];
	$content = $_POST['content'];
	$database = new Database();
	$database -> readConfig();
	$database -> connect();
	$statement = $database -> prepare("SELECT * FROM todo_users WHERE name=?");
	$statement -> bind_param("s", $name);
	$statement -> execute();
	$result = $statement -> get_result();
	if($result -> num_rows == 1) {
		$row = $result -> fetch_row();
		if($name != $row[1] || $row[0] != $_SESSION['ID']) {
			echo "Error 2";
			exit;
		}
	}
	$statement = $database -> prepare("INSERT INTO todo_user_" . $name . " (value) VALUES (?);");
	if($statement == FALSE) {
		echo "Error 3";
		exit;
	}
	$statement -> bind_param("s", $content);
	$statement -> execute();
	var_dump($statement -> get_result());
	$database -> close();
}
?>
