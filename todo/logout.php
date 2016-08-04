<?php
session_start();
unSet($_SESSION['ID']);
session_destroy();
header("Location: /todo/");
die();
?>
