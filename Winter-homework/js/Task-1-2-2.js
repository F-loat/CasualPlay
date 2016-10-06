var aqiData = [
	[86, 117, 80, 153, 119, 184, 143, 29, 43, 87, 143, 42, 110, 109, 148, 381, 211, 104, 177, 37, 51, 153, 169, 185, 40, 77, 128, 61, 155, 93, 184],
	[179, 105, 40, 50, 116, 158, 124, 102, 29, 35, 133, 150, 241, 311, 424, 339, 137, 95, 89, 208, 308, 313, 262, 309, 402, 330, 31, 106],
	[57, 175, 267, 88, 38, 38, 36, 63, 191, 126, 108, 207, 36, 58, 62, 128, 151, 181, 86, 75, 37, 54, 82, 166, 241, 322, 294, 169, 72, 63, 172],
	[140, 131, 63, 91, 64, 97, 133, 224, 194, 271, 88, 131, 197, 284, 132, 83, 121, 181, 83, 82, 68, 80, 149, 152, 175, 65, 74, 84, 118, 139],
	[166, 48, 94, 55, 50, 99, 95, 102, 88, 72, 45, 60, 89, 55, 116, 92, 98, 112, 140, 121, 142, 191, 127, 101, 121, 65, 105, 80, 97, 140, 157],
	[88, 62, 75, 98, 111, 88, 37, 56, 58, 90, 69, 63, 100, 83, 149, 167, 120, 87, 158, 71, 100, 59, 64, 97, 134, 173, 47, 50, 84, 121],
	[124, 84, 238, 237, 167, 253, 210, 150, 59, 78, 60, 49, 49, 91, 111, 117, 173, 185, 116, 97, 51, 39, 63, 86, 109, 155, 160, 168, 164, 160, 244],
	[196, 164, 151, 50, 48, 59, 114, 96, 133, 78, 51, 70, 45, 61, 73, 97, 96, 88, 129, 143, 178, 71, 142, 46, 45, 64, 90, 104, 98, 170, 87],
	[126, 36, 36, 70, 120, 183, 196, 46, 75, 97, 109, 98, 93, 69, 45, 71, 75, 88, 102, 159, 134, 124, 66, 49, 139, 162, 51, 84, 78, 48],
	[91, 75, 119, 101, 48, 47, 179, 309, 380, 351, 233, 25, 29, 72, 81, 73, 127, 194, 289, 254, 67, 100, 154, 263, 341, 85, 50, 84, 138, 203, 201],
	[85, 29, 51, 126, 125, 34, 61, 91, 79, 92, 70, 42, 44, 54, 124, 105, 38, 78, 267, 342, 215, 50, 155, 103, 177, 279, 101, 113, 269, 209],
	[55, 25, 56, 33, 42, 82, 74, 78, 267, 185, 39, 41, 64, 108, 108, 33, 94, 186, 57, 22, 39, 94, 99, 31, 42, 154, 234, 160, 134, 52, 46],
]; //录入数据
var month = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"]; //月份数组
var aqiL = 0; //AQI较低天数
var aqiM = 0; //AQI中等天数
var aqiH = 0; //AQI较高天数
var sum = []; //各月AQI合计值
var ave = []; //各月AQI平均值
var canvasP = document.getElementById("pieChart");
canvasP.width = 400;
canvasP.height = 360;
var contextP = canvasP.getContext("2d");
var canvasL = document.getElementById("lineChart");
canvasL.width = 460;
canvasL.height = 360;
var contextL = canvasL.getContext("2d");

for (j = 0; j < 12; j++) {
	sum[j] = 0;
	ave[j] = 0;
	for (i = 0, l = aqiData[j].length; i < l; i++) {
		aqi = aqiData[j][i];
		if (aqi < 200) {
			aqiL++
		} else if (aqi < 300) {
			aqiM++
		} else {
			aqiH++
		};
		sum[j] += aqi;
	}
	ave[j] = (sum[j] / l).toFixed(2);
	//console.log(ave[j]);
} //计算各数据
window.onload = function() {
	Circle(contextP, 0, 40);
	LineChart(contextL, 0, 0);
	Switch();
}

function Circle(cxt, x, y) /*画布，坐标偏移量*/ {
	cxt.save(); //保存画布各属性值
	cxt.clearRect(0, 0, canvasP.width, canvasP.height); //清空画布
	cxt.translate(x, y); //原点偏移
	var color = ["#5FD5F3", "#EE435A", "#EDEDED"]; //颜色数组
	var aqi = [aqiL, aqiM + aqiH, "AQI < 200", "AQI > 200"]; //字符数组
	cxt.textBaseline = "middle";
	cxt.fillStyle = "#666";
	cxt.font = "16px 微软雅黑 "; //设定字体属性
	for (i = 0; i < 2; i++) {
		cxt.textAlign = "left";
		cxt.fillText(aqi[i + 2], 64, 200 + 40 * i); //图例【左】文字
		drawCircle(contextP, 100 + 200 * i, 100, 52, color[2], 1); //圆环背景色
		drawCircle(contextP, 100 + 200 * i, 100, 52, color[i], aqi[i] / 365); //绘制圆环
		cxt.font = "26px 微软雅黑";
		cxt.textAlign = "right";
		cxt.fillText(Math.round(aqi[i] / 365 * 100).toFixed(0) + '%', 126 + 200 * i, 100); //圆环中心百分比文字
		cxt.font = "16px 微软雅黑 ";
		cxt.fillText(aqi[i] + " 天   占比" + Math.round(aqi[i] / 365 * 100).toFixed(0) + '%', 360, 200 + 40 * i); //图例【右】文字
		cxt.save();
		cxt.beginPath();
		cxt.arc(46, 200 + 40 * i, 10, 0, Math.PI * 2); //图例小圆
		cxt.fillStyle = color[i];
		cxt.fill();
		cxt.restore()
	}
	cxt.translate(-x, -y); //还原原点位置
	cxt.restore(); //还原画布各属性值
}

function Round(cxt, x, y) /*画布，坐标偏移量*/ {
	cxt.save()
	cxt.clearRect(0, 0, canvasP.width, canvasP.height);
	var color = ["#B6A2DE", "#FFB981", "#5FD5F3"];
	var percent = ["  " + Math.round(aqiH / 365 * 100).toFixed(0), "  " + Math.round(aqiM / 365 * 100).toFixed(0), Math.round(aqiL / 365 * 100).toFixed(0)]
	var aqi = [aqiH, aqiM, aqiL, aqiL + aqiM + aqiH, aqiL + aqiM, aqiL, "AQI > 300", "200< AQI < 300", "AQI < 200"]
	cxt.textBaseline = "middle";
	cxt.font = "16px 微软雅黑 ";
	for (i = 0; i < 3; i++) {
		cxt.textAlign = "left";
		cxt.fillText(aqi[i + 6], 64 + x, 200 + y + 40 * i);
		cxt.textAlign = "right";
		drawRound(contextP, 200 + x, 100 + y, 38, color[i], aqi[i + 3] / 365);
		cxt.fillText(aqi[i] + " 天   占比" + percent[i] + '%', 360 + x, 200 + y + 40 * i);
		cxt.save();
		cxt.beginPath();
		cxt.arc(46 + x, 200 + y + 40 * i, 10, 0, Math.PI * 2);
		cxt.fillStyle = color[i]
		cxt.fill();
		cxt.restore()
	}
	cxt.restore()
}

function LineChart(cxt, x, y) /*画布，坐标偏移量*/ {
	cxt.save();
	cxt.clearRect(0, 0, canvasL.width, canvasL.height);
	Form(contextL, 55, 27); //绘制背景格
	cxt.translate(x, y);
	cxt.beginPath();
	cxt.moveTo(70, 325 - ave[0] / 2 * 3);
	for (i = 1; i < 12; i++) {
		cxt.lineTo(70 + i * 30, 325 - ave[i] / 2 * 3);
	} //设定折线路径
	cxt.strokeStyle = "lightgreen";
	cxt.lineWidth = 2;
	cxt.lineJoin = "round"; //设定各属性
	cxt.stroke(); //绘制
	cxt.restore();
	cxt.translate(-x, -y);
}

function BarChart(cxt, x, y) /*画布，坐标偏移量*/ {
	cxt.save();
	cxt.clearRect(0, 0, canvasL.width, canvasL.height);
	Form(contextL, 55, 27);
	cxt.translate(x, y);
	cxt.beginPath();
	for (i = 0; i < 12; i++) {
		cxt.moveTo(15 + i * 30, 299);
		cxt.lineTo(15 + i * 30, 299 - ave[i] / 2 * 3);
	}
	cxt.strokeStyle = "#5FD5F3";
	cxt.lineWidth = 20;
	cxt.stroke();
	cxt.translate(-x, -y);
	cxt.restore();
}

function Form(cxt, x, y) /*画布，坐标偏移量*/ {
	cxt.translate(x, y);
	cxt.beginPath();
	cxt.moveTo(-1, 299);
	cxt.lineTo(361, 299); //X轴路径
	cxt.strokeStyle = "#aaa";
	cxt.stroke();
	cxt.fillStyle = "#666";
	for (i = 0; i <= 250; i = i + 50) {
		drawDashline(contextL, 0, 250 - i, 360, 250 - i, 5, "#ddd");
	} //绘制横向虚线
	for (i = 0; i <= 360; i = i + 30) {
		drawDashline(contextL, 0 + i, 0, 0 + i, 300, 5, "#ddd");
	} //绘制纵向虚线
	for (i = 305; i >= 0; i = i - 150) {
		cxt.font = "13px Microsoft Yahei";
		cxt.textAlign = "right";
		cxt.fillText((305 - i) / 15 * 10, -5, i);
	} //绘制纵轴单位
	for (j = 0, i = 14; j <= 11; j++, i = i + 30) {
		cxt.font = "13px Microsoft Yahei";
		cxt.textAlign = "center";
		cxt.fillText(month[j], i, 320);
	} //绘制横轴单位
	cxt.translate(-x, -y);
}

function drawCircle(cxt, x, y, r, c, p) /*画布，起始点坐标，半径，颜色，绘制百分比（小数）*/ {
	cxt.beginPath();
	cxt.arc(x, y, r, -Math.PI * 0.5, Math.PI * (p * 2 - 0.5));
	cxt.lineWidth = 16;
	cxt.strokeStyle = c;
	cxt.stroke()
}

function drawRound(cxt, x, y, r, c, p) /*画布，起始点坐标，半径，颜色，绘制百分比（小数）*/ {
	cxt.beginPath();
	cxt.arc(x, y, r, -Math.PI * 0.5, Math.PI * (p * 2 - 0.5));
	cxt.lineWidth = 2 * r;
	cxt.strokeStyle = c;
	cxt.stroke()
}

function drawDashline(cxt, x, y, ex, ey, interval, color) /*画布，起始点坐标，终止点坐标，间隔，颜色*/ {
	lineLength = Math.pow(((ex - x) * (ex - x) + (ey - y) * (ey - y)), 0.5); //计算起点和终点间距离
	ix = (ex - x) * interval / lineLength;
	iy = (ey - y) * interval / lineLength; //计算每小段虚线坐标偏移量
	for (; x < ex || y < ey; x = x + 2 * ix, y = y + 2 * iy) {
		cxt.beginPath();
		cxt.moveTo(x, y);
		cxt.lineTo(x + ix, y + iy);
		cxt.strokeStyle = color;
		cxt.stroke();
	} //绘制每小段函数
} //绘制虚线函数，暂只能自左上向右下画线

function Switch() {
	document.getElementById("circle").onclick = function() {
		Circle(contextP, 0, 40); //绘制图表
		if (this.className == "") {
			this.className += "spanActive"; //标题栏添加class
			document.getElementById("round").className = ""; //上一图表标题class清空
		}
	}
	document.getElementById("round").onclick = function() {
		Round(contextP, 0, 26);
		if (this.className == "") {
			this.className += "spanActive";
			document.getElementById("circle").className = "";
		}
	}

	document.getElementById("line").onclick = function() {
		LineChart(contextL, 0, 0);
		if (this.className == "") {
			this.className += "spanActive";
			document.getElementById("bar").className = "";
		}
	}
	document.getElementById("bar").onclick = function() {
		BarChart(contextL, 55, 27);
		if (this.className == "") {
			this.className += "spanActive";
			document.getElementById("line").className = "";
		}
	}
} //图表切换函数