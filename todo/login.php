<?php
include_once 'php/Database.php';
session_start();

$error = "&nbsp;";//Non breaking space

if($_SERVER['REQUEST_METHOD'] == "POST") {
	do {
		if(!isSet($_POST['username']) && !isSet($_POST['password'])) {
			$error =  "Malformed request.";
			break;
		}
		$username = $_POST['username'];
		$password = $_POST['password'];

		$database = new Database();
		$database -> readConfig();
		$database -> connect();
		$statement = $database -> prepare("SELECT * FROM todo_users WHERE `name`=?;");
		$statement -> bind_param("s", $username);
		$statement -> execute();
		$result = $statement -> get_result();
		if($result -> num_rows == 1) {
			$row = $result -> fetch_row();
			if ($row[2] != $password) {
				$error = "Credentials not recognised.";
				$database -> close();
				break;
			}
			$_SESSION['ID'] = $row[0];
			header("Location: /todo/");
			die();
		} else {
			$error = "Credentials not recognised.";
		}
		$database -> close();
	} while(0);//Will run once, and can be broken out of.
}
?>
<head>
	<link rel="stylesheet" type="text/css" href="index.css">
	<script src="res/jquery-3.0.0.min.js" type="text/javascript"></script>
	<script src="index.js"></script>
</head>
<body>
	<div class="header" align="center">
		Login
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
	<form action="login.php" method="post" align="center">
		<div class="title">Username</div>
		<input type="text" name="username"></input><br>
		<div class="title">Password</div>
		<input type="password" name="password"></input><br><br>
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
