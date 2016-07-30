<?php
include_once 'php/Database.php';

$database = new Database();
$database -> readConfig();
$database -> connect();
?>
<head>
	<link rel="stylesheet" type="text/css" href="index.css">
	<script src="res/jquery-3.0.0.min.js" type="text/javascript"></script>
	<script src="index.js"></script>
</head>
<body>
	<div class="header" align="center">
		TODO
	</div>
	<div class="login"><a href="login.php">login</a> / <a href="register.php">register</a></div>
	<div class="tasks" align="center">
		<div class="task">Finish website.</div>
		<div class="task">Get milk.</div>
		<div class="task">Setp up Git for website.</div>
	</div>
</body>
