<?php
require_once 'Config.php';
?>
<html>
	<head>
		<meta charset="utf-8"/>
		<title>
			留言板
		</title>
		<link rel="stylesheet" type="text/css" href="css/GuestBook.css"/>
	</head>
	<body>
		<audio id="audio">
		  <source src="music/张赫宣 - 我们不该这样的.ogg" type="audio/ogg">
		  <source src="music/张赫宣 - 我们不该这样的.mp3" type="audio/mpeg">
		  <source src="music/张赫宣 - 我们不该这样的.wav" type="audio/vnd.wave">
			你的浏览器不支持audio！！
		</audio>
		<canvas id="text">你的浏览器不支持canvas！！</canvas>
		<form action="InsertGuest.php" method="post">
			<span>昵称：</span>
			<span>邮件地址：</span>
			<br />
			<input name="NickName" type="text"/>
			<input name="Email" type="text"/>
			<br />
			<span>留言内容：</span>
			<br />
			<textarea name="Context"></textarea>						
			<br />
			<button>
				提交留言
			</button>
		</form>
		<ul id="guest">
			<h3>留言记录</h3>
			<?php
				while ($s=mysqli_fetch_assoc($sql)) {
					echo '<li><span id="NickName">'.$s['NickName'].'</span>';
					echo '<span id="Date">'.$s['Date'].'</span>';	
					echo '<br />';
					echo '<span id="Context">'.$s['Context'].'</span></li>';
					echo '<br />';
				}//循环输出数据库内信息
			?>
		</ul>
		<script type="text/javascript" src="js/audio.js"></script>
	</body>
</html>