<?php
require_once 'Config.php';//引入配置文件
if (!(isset($_POST['NickName']) && (!empty($_POST['NickName'])))) {
	echo "<script>alert('昵称不能为空');window.location.href='GuestBook.php';</script>";
} else if (!(isset($_POST['Email']) && (!empty($_POST['Email'])))) {
	echo "<script>alert('邮件地址不能为空');window.location.href='GuestBook.php';</script>";
} else {
	$NickName = $_POST['NickName'];
	$Email = $_POST['Email'];
	$Context = $_POST['Context'];
	$Context = preg_replace("'<script(.*?)<\/script>'is","",$Context); //去除js脚本//SQl语句就先不管了，，
	echo "<script>window.location.href='GuestBook.php';</script>";//返回原网页
	mysqli_query($con, "INSERT INTO guestbook.info (ID, NickName, Email, Context, Date) VALUES (NULL, '$NickName', '$Email', '$Context', CURRENT_TIMESTAMP);");//录入数据
}//判断提交内容是否为空，为空则返回原网页并发出提示，不为空则录入数据库
?>