<?php
include_once 'php/Database.php';

$database = new Database();
$database -> readConfig();
$database -> connect();

var_dump($_POST);
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
	<form method="post" action="register.php" align="center">
		<div class="title" name="username">Username</div>
		<input type="text"></input><br>
		<div class="title" name="password">Password</div>
		<input type="password"></input>
		<div class="title" name="password2">Confirm Password</div>
		<input type="password"></input><br><br>
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
