<?php
include_once 'php/Database.php';

$database = new Database();
$database -> readConfig();
$database -> connect();

$error = "&nbsp;";//Non breaking space

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

		//SUCCESS - Continue registering!
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
		Register
	</div>
	<div class="login"><a href="login.php">login</a> / <a href="register.php">register</a></div>
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
