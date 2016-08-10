<?php
include_once 'php/Database.php';

$error = "&nbsp;";

if($_SERVER['REQUEST_METHOD'] == "POST") {
	do {
		if(!isSet($_POST['username']) && !isSet($_POST['password']) && !isSet($_POST['password2'])) {
			$error =  "Malformed request.";
			break;
		}
		$username = $_POST['username'];
		$password = $_POST['password'];
		$password2 = $_POST['password2'];
		if(strlen($username) < 4) {
			$error = "Username must be at least 4 characters long.";
			break;
		}
		if(strlen($password) < 6) {
			$error = "Password must be at least 6 characters long.";
			break;
		}
		if($password != $password2) {
			$error = "Passwords do not match.";
			break;
		}

		$path = dirname(__FILE__) . "/res/todo.conf";
                $config = fopen($path, "r") or die("Unable to read config file.");
                $contense = fread($config, filesize($path));

                list($lsalt) = explode("\n", $contense);
                $salt = explode("=", $lsalt, 2)[1];

		$passwordHash = md5($password . $salt);

		$database = new Database();
		$database -> readConfig();
		$database -> connect();
		$statement = $database -> prepare("INSERT INTO todo_users (name, password) VALUES (?, ?);");
		$statement -> bind_param("ss", $username, $passwordHash);
		$statement -> execute();
		//Create user table to store todo items.
		$database -> close();
		header("Location: /todo/login.php");
	} while(0);
}
?>
<head>
	<link rel="stylesheet" type="text/css" href="index.css">
	<script src="res/jquery-3.0.0.min.js" type="text/javascript"></script>
	<script src="index.js"></script>
</head>
<body>
	<div class="header" align="center">
		Register
	</div>
        <?php
                if(!isSet($_SESSION['ID'])) {
                        ?><div class="login"><a href="login.php">login</a> / <a href="register.php">register</a></div><?php
                } else {
                        $database = new Database();
                        $database -> readConfig();
                        $database -> connect();
                        $statement =$database -> prepare("SELECT `name` from todo_users WHERE `id`=?");
                        $statement -> bind_param("i", $_SESSION['ID']);
                        $statement -> execute();
                        $name = $statement -> get_result() -> fetch_row()[0];
                        ?><div class="login"><?php echo $name; ?>&nbsp;<a href="/todo/logout.php">(logout)</a></div><?php
                }
        ?>
	<div align="center" style="color: red"><?php echo $error ?></div>
	<form action="register.php" method="post" align="center">
		<div class="title">Username</div>
		<input type="text" name="username"></input><br>
		<div class="title">Password</div>
		<input type="password" name="password"></input>
		<div class="title">Confirm Password</div>
		<input type="password" name="password2"></input><br><br>
		<input type="submit" value="Submit"></input>
	</form>
</body>
<style>
	input {
		background: none;
		width: 300px;
		border: 1px solid;
		margin-bottom: 10px;
	}
	input[type="submit"] {
		cursor: pointer;
	}
	.title {
		font-size: 18px;
	}
</style>
