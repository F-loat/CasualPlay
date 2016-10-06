<?php
header("Content-type:text/html;charset=utf-8");
define('HOST', '127.0.0.1');
define('USERNAME', 'root');
define('PASSWORD', '');
$con = mysqli_connect(HOST, USERNAME, PASSWORD);//连接数据库
mysqli_query($con, 'set names utf8');//设置字符集
if (!(mysqli_select_db($con, 'GuestBook'))) {
	$sql = 'CREATE DATABASE GuestBook';
	mysqli_query($con, $sql);
	echo "<script>alert('数据库不存在，已重新创建。');window.location.href='GuestBook.php';</script>";
}//选择库，不存在则创建
if (!($sql = mysqli_query($con, 'SELECT * FROM info'))) {
	$sql = 'CREATE TABLE info (ID int(10),NickName char(10),Email varchar(20),Context char(200),Date datetime)';
	mysqli_query($con, $sql);//创建表
	$sql = 'ALTER TABLE info ADD PRIMARY KEY(ID)';
	mysqli_query($con, $sql);//设置主键
	$sql = 'alter table info change ID ID Int not null auto_increment';
	mysqli_query($con, $sql);//设置主键自增长
	$sql = 'alter table info auto_increment=1';
	mysqli_query($con, $sql);//设置自增长初始值为1
	$sql = 'ALTER TABLE info CHANGE NickName NickName CHAR(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL, CHANGE Email Email VARCHAR(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL, CHANGE Context Context CHAR(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL';
	mysqli_query($con, $sql);//修改排序规则
	echo "<script>alert('数据表不存在，已重新创建。');window.location.href='GuestBook.php';</script>";
}//选择数据表，不存在则创建
?>