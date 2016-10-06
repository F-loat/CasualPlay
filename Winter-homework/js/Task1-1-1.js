var jiandao = document.getElementById("jiandao");
var shitou = document.getElementById("shitou");
var bu = document.getElementById("bu");
var time = 0;
var win = 0;

function result(x) {
	document.getElementById("Options").style.display = "none";
	document.getElementById("result").style.display = "block";
	document.getElementById("mine").src = "imgs/" + x + ".png";
	if (x == "jiandao") {
		x = 1;
	} else if (x == "shitou") {
		x = 2;
	} else {
		x = 3
	}
	var ai = Math.random();
	if (ai < 0.33) {
		ai = 1
		document.getElementById("ai").src = "imgs/jiandao.png";
	} else if (ai < 0.67) {
		ai = 2
		document.getElementById("ai").src = "imgs/shitou.png";
	} else {
		ai = 3
		document.getElementById("ai").src = "imgs/bu.png";
	}
	time++;
	if (x == ai) {
		document.getElementById("show").innerText = "平局";
	} else if (x - ai == -2 || x - ai == 1) {
		win++;
		document.getElementById("show").innerText = "你赢了";
	} else {
		document.getElementById("show").innerText = "你熟了";
	}
	document.getElementById("time").innerHTML = "共进行了 " + time + " 次游戏，取得 " + win + " 次胜利。"
}

function again() {
	document.getElementById("result").style.display = "none";
	document.getElementById("Options").style.display = "block";
	document.getElementById("show").innerText = "";
}