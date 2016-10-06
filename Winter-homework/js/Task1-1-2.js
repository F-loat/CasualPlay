window.onresize = function() {
	location.reload()
}
//不兼容火狐，应该是碰撞检测的那个函数的问题and还没添加触摸事件响应and嗯，完全不兼容移动端。。。
var fullWidth = document.body.clientWidth;
var fullHeight = document.body.clientHeight;
var canvas = document.getElementById("canvas");
canvas.width = fullWidth;
canvas.height = fullHeight;
var context = canvas.getContext("2d");
var hSize = Math.min(fullWidth, fullHeight) * 0.18; //设置仓鼠大小
var gSize = hSize / 2.2; //设置瓜子大小
var mX = fullWidth * 0.5; //仓鼠初始位置
var mY = 0;
var t = 60; //游戏时间初始值
var Jsum = 0; //金色瓜子总数
var Ysum = 0; //银色瓜子总数
var Jget = 0; //金色瓜子接到数
var Yget = 0; //银色瓜子接到数
var fontSize = parseInt(Math.min(fullWidth, fullHeight) / 100 * 3) + 3;
var hamster = new Image();
hamster.src = "imgs/hamster.png"; //设置仓鼠图片
var seeds = []; //瓜子数组
splash();

function addSeeds() {
	var seed = {
			x: Math.random() * fullWidth * 0.96, //瓜子横坐标
			y: -gSize, //瓜子纵坐标
			vy: (Math.random() + 1), //瓜子纵坐标增量
			g: Math.random() * 0.05, //加速度
			ram: Math.random(), //金银区分标识
			img: "" //瓜子图片
		} //设置瓜子属性
	var guazi = new Image();
	if (seed.ram > 0.5) {
		guazi.src = "imgs/Jguazi.png";
		seed.ram = 1; //金瓜子ram属性设为1
	} else {
		guazi.src = "imgs/Yguazi.png";
	} //随机绑定金瓜子或银瓜子
	seed.img = guazi; //设置img属性
	seeds.push(seed); //添加到数组
}

function downSeeds() {
	var sNum = 0; //数组有效元素计数
	for (var i = 0; i < seeds.length; i++) {
		seeds[i].y += seeds[i].vy;
		seeds[i].vy += seeds[i].g;
		context.beginPath();
		context.rect(mX - hSize * 0.25, fullHeight - hSize, hSize * 0.5, hSize); //碰撞检测区域
		if (context.isPointInPath(seeds[i].x + gSize * 0.5, seeds[i].y + gSize * 0.1)) {
			seeds[i].y = fullHeight;
			if (seeds[i].ram == 1) {
				Jget++
			} else {
				Yget++
			}
		} //碰撞检测
		if (seeds[i].y <= fullHeight) {
			seeds[sNum++] = seeds[i]
		} //超出屏幕检测，未超出则重新在数组内排序
	}
	draw();
	while (seeds.length > sNum) {
		seeds.pop();
		if (seeds[seeds.length - 1].ram == 1) {
			Jsum++;
		} else {
			Ysum++
		}
	} //将无效元素删除并计数，释放内存
	//console.log(seeds.length)
}

function draw() {
	if (event) {
		mX = event.clientX;
	} //获取鼠标坐标并赋值给仓鼠位置
	context.clearRect(0, 0, fullWidth, fullHeight); //清空画布
	context.drawImage(hamster, mX - hSize * 0.5, fullHeight - hSize, hSize, hSize); //绘制仓鼠
	for (var i = 0; i < seeds.length; i++) {
		context.drawImage(seeds[i].img, seeds[i].x, seeds[i].y, gSize, gSize);
	} //绘制瓜子
	context.font = fontSize + "px 微软雅黑";
	context.fillStyle = "black";
	context.textAlign = "left";//设置字体属性
	context.fillText("得分：" + (Jget * 2 + Yget) + " 分", 20, 40);//绘制得分
	context.textAlign = "right";
	if (t <= 10) {
		context.fillStyle = "red";
	}//设置字体属性
	context.fillText("时间：" + t + " 秒", fullWidth - 20, 40);//绘制时间
}

function splash() {
	context.clearRect(0, 0, fullWidth, fullHeight);//清空画布
	canvas.addEventListener("mousemove", splash, false); //绑定鼠标移动事件
	var sp = new Image();
	sp.src = "imgs/splash.png";
	context.drawImage(sp, fullWidth * 0.5 - hSize * 1.5, 40, hSize * 3, hSize * 3);//绘制启动图
	context.textAlign = "center";
	context.textBaseline = "middle";
	context.fillStyle = "black";
	context.font = (fontSize + 3) + "px 微软雅黑";//设置字体属性
	context.fillText("开始游戏", fullWidth * 0.5, fullHeight * 0.1 + fontSize * 18);//绘制文字
	if (event) {
		mY = event.clientY;
	}//获取鼠标位置
	context.beginPath();
	context.rect(0, fullHeight * 0.1 + fontSize * 18 - fontSize * 0.6, fullWidth, fontSize * 1.3); //碰撞检测区域
	if (context.isPointInPath(mX, mY)) {
		context.beginPath();
		context.moveTo(0, fullHeight * 0.1 + fontSize * 18 + 2);
		context.lineTo(fullWidth, fullHeight * 0.1 + fontSize * 18 + 2);
		context.lineWidth = fontSize * 1.4;
		context.strokeStyle = "#666";//设置线条属性及路径
		context.stroke();
		context.fillStyle = "white";//设置文字颜色
		context.fillText("开始游戏", fullWidth * 0.5, fullHeight * 0.1 + fontSize * 18);//绘制文字
		canvas.style.cursor = "pointer";//设置鼠标形状
		canvas.addEventListener("click", start, false); //绑定鼠标点击事件
	} else {
		canvas.style.cursor = "default";//恢复鼠标形状
		canvas.removeEventListener("click", start); //移除鼠标点击事件
	}//
}

function start() {
	canvas.style.cursor = "none";//隐藏鼠标
	canvas.removeEventListener("click", start); //移除鼠标点击事件
	canvas.removeEventListener("mousemove", splash); //移除鼠标移动事件
	canvas.removeEventListener("mousemove", end); //移除鼠标移动事件
	canvas.addEventListener("mousemove", draw, false); //绑定鼠标移动事件
	downer = setInterval("downSeeds()", 15);//定时执行downSeeds函数
	adder = setInterval("addSeeds()", 1200);//定时添加瓜子
	timer = setInterval(function() {
		t = t - 1;
		if (t == 0) {
			clearInterval(downer);
			clearInterval(adder);
			clearInterval(timer);//清除定时器
			while (seeds.length > 0) {
				if (seeds[seeds.length - 1].ram == 1) {
					Jsum++;
				} else {
					Ysum++;
				}
				seeds.pop();//清空数组
			}
			end()
		}
	}, 1000);//定时修改时间，并判断游戏是否结束
}

function end() {
	context.clearRect(0, 0, fullWidth, fullHeight); //清空画布
	canvas.style.cursor = "default";
	canvas.removeEventListener("mousemove", draw); //移除鼠标移动事件
	canvas.addEventListener("mousemove", end, false); //绑定鼠标移动事件
	if (event) {
		mX = event.clientX;
	} //获取鼠标坐标并赋值给仓鼠位置
	context.drawImage(hamster, mX - hSize * 0.5, fullHeight - hSize, hSize, hSize); //绘制仓鼠
	context.fillStyle = "rgba(255,255,255,0.7)"
	context.fillRect(0, 0, fullWidth, fullHeight * 0.75);//绘制总结文字背景
	var summary = [];//游戏总结文字
	summary[0] = '游戏结束';
	summary[1] = '本局游戏共落下瓜子' + (Jsum + Ysum) + '个';
	summary[2] = '你接到了' + (Jget + Yget) + '个，漏掉' + (Jsum + Ysum - Jget - Yget) + '个';
	summary[3] = '其中';
	summary[4] = '接到金瓜子' + Jget + '个，银瓜子' + Yget + '个';
	summary[5] = '漏掉金瓜子' + (Jsum - Jget) + '个，银瓜子' + (Ysum - Yget) + '个';
	if (Jget + Yget == 0) {
		summary[6] = '童鞋 难道你想要的是原生瓜子？ (´・ω・`)'
	} else if (Jget + Yget < 5) {
		summary[6] = '艾玛 你点了开始就开始睡觉了吧(｡・`ω´･)'
	} else if (Jget == 0 || Jsum - Jget > Ysum - Yget) {
		summary[6] = '看来 童鞋你更想要的是银瓜子啊 (•̀ᴗ•́)و ̑̑'
	} else if (Jsum == Jget && Ysum == Yget) {
		summary[6] = '童鞋 是个瓜子你就要啊。。  (￣▽￣")'
	} else if (Yget != 0 && Jsum - Jget == Ysum - Yget) {
		summary[6] = '童鞋 是个瓜子你就想要啊。。 (。-`ω´-)'
	} else {
		summary[6] = '看来 童鞋你更想要的是金瓜子啊ಥ_ಥ'
	}
	summary[7] = '再来一次';
	context.fillStyle = "black";
	context.textAlign = "center";
	context.textBaseline = "middle";
	context.font = (fontSize + 2) + "px 微软雅黑 bold";//设置文字属性
	context.fillText(summary[0], fullWidth * 0.5, fullHeight * 0.1);//绘制文字
	context.font = (fontSize - 3) + "px 微软雅黑";//设置字体
	context.fillStyle = "#333";//设置绘制颜色
	for (i = 1; i < 7; i++) {
		context.fillText(summary[i], fullWidth * 0.5, fullHeight * 0.1 + i * fontSize * 1.8)
	}//逐行绘制文字
	context.font = (fontSize + 3) + "px 微软雅黑";//设置字体
	context.fillText(summary[7], fullWidth * 0.5, fullHeight * 0.1 + fontSize * 14);//绘制文字
	if (event) {
		mY = event.clientY;
	}//获取鼠标位置
	context.beginPath();
	context.rect(0, fullHeight * 0.1 + fontSize * 14 - fontSize * 0.6, fullWidth, fontSize * 1.3); //碰撞检测区域
	if (context.isPointInPath(mX, mY)) {
		context.beginPath();
		context.lineWidth = fontSize * 1.4;
		context.moveTo(0, fullHeight * 0.1 + fontSize * 14 + 2);
		context.lineTo(fullWidth, fullHeight * 0.1 + fontSize * 14 + 2);
		context.strokeStyle = "#666"//设置绘制路径及属性
		context.stroke();
		context.fillStyle = "white";//设置绘制颜色
		context.fillText(summary[7], fullWidth * 0.5, fullHeight * 0.1 + fontSize * 14);//绘制文字
		canvas.style.cursor = "pointer";//设置鼠标形状
		canvas.addEventListener("click", again, false); //绑定鼠标点击事件
	} else {
		canvas.style.cursor = "default";//恢复鼠标形状
		canvas.removeEventListener("click", again); //移除鼠标点击事件
	}
}

function again() {
	t = 60; //游戏时间初始值
	Jsum = 0; //金色瓜子总数
	Ysum = 0; //银色瓜子总数
	Jget = 0; //金色瓜子接到数
	Yget = 0; //银色瓜子接到数
	start()
}