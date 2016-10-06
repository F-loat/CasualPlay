window.onresize = function() {
	location.reload()
}

var alltext = "[00:00.06] 我们不该这样的[00:20.29] 对不起我有些累了[00:24.78] 我问我们都怎么了[00:29.80] 再不像棋逢对手般[00:33.69] 哪怕爱着恨着或酸着[00:38.45] 突然有了很多心得[00:43.02] 但却痛到不能选择[00:48.16] 好多事我们都错了[00:56.73] 我们不该这样的放手不爱了[01:01.20] 我们怎么被动的苦笑着[01:05.82] 不管对的错的[01:07.91] 至少最后现实都输了[01:12.70] 假想的竞争者[01:14.67] 我们不该这样的[01:17.29] 放手不爱了[01:19.45] 我们怎么爱着却不快乐[01:24.01] 抱歉我浪费了[01:26.13] 可以更幸福的资格[01:33.45] 也许真的是太爱了[01:38.03] 愤怒也是因为忐忑[01:42.77] 每当谁怪谁太苛刻[01:46.72] 我们却又不懂得自责[01:51.58] 好几次也都想算了[01:56.12] 可心还会狠狠地疼着[02:01.24] 想体谅你却更难过[02:07.40] Oh no[02:09.77] 我们不该这样的放手不爱了[02:14.23] 我们怎么被动的苦笑着[02:18.96] 不管对的错的[02:21.08] 至少最后现实都输了[02:25.80] 假想的竞争者[02:27.80] 我们不该这样的[02:30.36] 放手不爱了[02:32.46] 我们怎么爱着却不快乐[02:37.06] 抱歉我浪费了[02:39.21] 可以更幸福的资格[02:46.36] 我们怎么[02:47.36] 我们怎么[02:50.68] 我们怎么被动的苦笑着[02:55.39] 不管对的错的[02:57.56] 至少最后现实都输了[03:02.38] 假想的竞争者[03:04.88] 我们不该这样的[03:06.96] 放手不爱了[03:09.01] 我们怎么爱着却不快乐[03:13.53] 抱歉我浪费了[03:15.80] 可以更幸福的资格[03:32.33] 我浪费了更幸福的资格";
var sometextCache = alltext.split("[");
var sometext = [];
var sometimeCache = [];
var sometime = [];
for (i = 0; i < sometextCache.length; i++) {
	sometext[i] = sometextCache[i].substr(10);
	sometimeCache[i] = sometextCache[i].substring(0, 8);
	sometime[i] = -(-sometimeCache[i].substring(0, 2) * 60 - sometimeCache[i].substring(3, 9))
}
sometext.splice(0, 1);
sometextCache.length = 0; //清空数组
sometimeCache.length = 0; //清空数组
var text = []; //分离单字
var audio = document.getElementById("audio")
var at = 0; //播放时间
var atOld = 0; //上一个播放时间
window.onload = function() {
	audio.play()
}
document.addEventListener('touchstart', function() {
	audio.play();
}, false);
audio.ontimeupdate = function() {
	at = -(-audio.currentTime.toFixed(2) - 1.8); //提前显示
	for (c = 2; c < sometime.length; c++) {
		if (at > sometime[c] && atOld < sometime[c]) {
			sometext.splice(0, 1);
			sometime.splice(0, 1); //删除数组中第一个元素
			clearInterval(t);
			init();
		};
	}
	atOld = at;
}
var canvas = document.getElementById("text");
var fullWidth = document.body.clientWidth;
var fullHeight = document.body.clientHeight;
canvas.width = fullWidth
canvas.height = fullHeight
var context = canvas.getContext("2d")
context.font = "15px 微软雅黑";
init();

function echo(str, x, y, r) {
	inner += str;
	context.fillStyle = "cornflowerblue";
	if (Math.pow(-1, i) == 1) {
		fillText(inner, x, y, s);
	} else {
		fillText(inner + "_", x, y, s);
	}//逐字输出
	i++;
	if (sometext.length < 2 && i >= text.length) {
		clearInterval(t);
	} else if (i >= text.length) {
		clearInterval(t);
		context.beginPath();
		context.fillStyle = "rgba(255,0,0,0.3)"
		fillText(inner, x, y, s);
		context.translate(x, y); //修改坐标原点
		context.rotate(-r); //复原坐标系
		context.translate(-x, -y); //复原坐标原点
	}
}

function fillText(str, x, y, s) {
	context.putImageData(imgData, 0, 0); //复原输出完毕句段快照
	context.beginPath();
	context.font = s + "px 微软雅黑"
	context.fillText(str, x, y);
}

function init() {
	//context.fillRect(0,0,200,100)
	inner = "";
	text = sometext[0].split("");
	i = 0;
	r = (Math.random() - 0.5) * Math.PI;
	x = Math.random() * fullWidth;
	y = Math.random() * fullHeight;
	imgData = context.getImageData(0, 0, fullWidth, fullHeight); //抓取屏幕快照
	context.translate(x, y); //修改坐标原点，即修改旋转中心点
	context.rotate(r); //旋转坐标系
	context.translate(-x, -y); //恢复坐标原点位置
	t = setInterval(function() {
			echo(text[i], x, y, r)
		}, 100) //启用定时器
	s = Math.random() * 10 + 15;
}