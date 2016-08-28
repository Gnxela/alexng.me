<?php
include_once 'php/Database.php';
session_start();

$error = "&nbsp;";//Non breaking space

if($_SERVER['REQUEST_METHOD'] == "POST") {
	$error = "";
	do {
		if(!isSet($_POST['mode'])) {
			$error = "Mode not selected.";
			break;
		}
		$mode = $_POST['mode'];
		if($mode == "add") {
			if(!isSet($_POST['name']) || !isSet($_POST['content'])) {
				$error = "Incorrect arguments supplied.";
				break;
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
					$error = "Simple Auth failed.";
					break;
				}
			} else {
				$error = "Simple Auth failed.";
                        	break;

			}
			$statement = $database -> prepare("INSERT INTO todo_user_" . $name . " (value) VALUES (?);");
			if($statement == FALSE) {
				$error =  "Error 3";
				break;
			}
			$statement -> bind_param("s", $content);
			$statement -> execute();
			if($status == false) {
                                $error = "Query failed.";
                        }
			$database -> close();
		} else if($mode == "update") {
			if(!isSet($_POST['name']) || !isSet($_POST['postID']) || !isSet($_POST['striked'])) {
				$error = "Incorrect arguments supplied.";
				break;
			}
			$name = $_POST['name'];
			$postID = $_POST['postID'];
			$striked = $_POST['striked'];
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
                                        $error = "Simple Auth failed.";
                                        break;
                                }
                        } else {
                                $error = "Simple Auth failed.";
                                break;

                        }
			$statement = $database -> prepare("UPDATE todo_user_" . $name . " SET `striked`=? WHERE `id`=?;");
			$statement -> bind_param("ss", $striked, $postID);
			$status = $statement -> execute();
			if($status == false) {
				$error = "Query failed.";
			}
			$database -> close();
		}
	} while(false);
	echo $error;
}
?>
