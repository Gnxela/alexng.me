<?php
include_once 'php/Database.php';
session_start();

/*
	Tecnically, someone could inject SQL through their name.
*/

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
			$database -> close();
			?><div class="login"><?php echo $name; ?>&nbsp;<a href="/todo/logout.php">(logout)</a></div><?php
                }
        ?>
	<div class="tasks" align="center">
		<?php
			 if(isSet($_SESSION['ID'])) {
				$database = new Database();
                	        $database -> readConfig();
                	        $database -> connect();
                	        $statement = $database -> prepare("SELECT * from todo_user_" . $name . " WHERE `striked`=0");
                	        $statement -> execute();
				$result = $statement -> get_result();
				?><div class="todo"><?php
				while ($row = $result -> fetch_row()) {
					?><div <?php echo "id=\"" . $row[0] . "\""; ?> class="task"><?php echo $row[1] ?></div><?php
				}
				?></div>

				<input id="INPUT"></input><?php

				$statement = $database -> prepare("SELECT * from todo_user_" . $name . " WHERE `striked`=1");
                                $statement -> execute();
                                $result = $statement -> get_result();
				?><div class="complete"><?php
                                while ($row = $result -> fetch_row()) {
					?><div <?php echo "id=\"" . $row[0] . "\""; ?> class="task strike"><?php echo $row[1] ?></div><?php
                                }
				?></div><?php
				$database -> close();
			} else {
				?><div class="task invincible">Please log in to see todo items.</div><?php
			}
		?>
	</div>
</body>
