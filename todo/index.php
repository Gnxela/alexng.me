<?php
include_once 'php/Database.php';
session_start();
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
			?><div class="login"><?php echo $name; ?></div><?php
                }
        ?>
	<div class="tasks" align="center">
		<?php
			 if(isSet($_SESSION['ID'])) {
				$database = new Database();
                	        $database -> readConfig();
                	        $database -> connect();
                	        $statement = $database -> prepare("SELECT * from todo_user_" . $name);
                	        $statement -> execute();
				$result = $statement -> get_result();
				while ($row = $result -> fetch_row()) {
					?><div class="task<?php echo $row[2] == 1 ? ' strike' : ''; ?>"><?php echo $row[1] ?></div><?php
				}
				$database -> close();
			} else {
				?><div class="task">Please log in to see todo items.</div><?php
			}
		?>
	</div>
</body>
