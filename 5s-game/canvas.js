var fullWidth = document.body.clientWidth;
var fullHeight = document.body.clientHeight;
var canvas = document.getElementById("canvas");
canvas.width = fullWidth;
canvas.height = fullHeight;
var cxt = canvas.getContext("2d");
var particleRadius = 2, //粒子半径
	posX = 0, //粒子圆心X坐标
	posY = 0, //粒子圆心Y坐标
	plnX = fullWidth * 0.5,
	plnY = fullHeight * 0.5

cxt.fillRect(0, 0, fullWidth, fullHeight);
var dotnum=3;
var x = [];
var y = [];
var x_ = [];
var y_ = [];
var ax = [];
var ay = [];

dotint()
dot=setInterval(drawdot, 30)
dotup=setInterval(function () {
	dotnum++;
	document.getElementById("level").innerText="第"+(dotnum-2)+"关";
	posX = Math.random() * fullWidth;
	posY = Math.random() * fullHeight;
	x.push(posX);
	y.push(posY);
	x_.push(posX);
	y_.push(posY);
	ax.push(Math.random() * 10);
	ay.push(Math.random() * 10);
},5000)

function dotint () {
	for (var i = 0; i < dotnum; i++) {
		cxt.beginPath()
		cxt.fillStyle = "aqua";
		posX = Math.random() * fullWidth;
		posY = Math.random() * fullHeight;
		x.push(posX);
		y.push(posY);
		x_.push(posX);
		y_.push(posY);
		ax.push(Math.random() * 10);
		ay.push(Math.random() * 10);
		cxt.arc(posX, posY, particleRadius, 0, Math.PI * 2, true);
		cxt.fill();
	}
}

function drawdot() {
	drawplane(plnX, plnY, 3);
	cxt.beginPath();
	cxt.fillStyle = "aqua";
	for (var i = 0; i < dotnum; i++) {
		cxt.beginPath();
		if (x_[i] > 0 && x_[i] < fullWidth && y_[i] > 0 && y_[i] < fullHeight) {
			if (x[i] > fullWidth * 0.5 && y[i] > fullHeight * 0.5) {
				posX = x_[i] - ax[i];
				posY = y_[i] - ay[i];
			} else if (x[i] > fullWidth * 0.5 && y[i] < fullHeight * 0.5) {
				posX = x_[i] - ax[i];
				posY = y_[i] + ay[i];
			} else if (x[i] < fullWidth * 0.5 && y[i] > fullHeight * 0.5) {
				posX = x_[i] + ax[i];
				posY = y_[i] - ay[i];
			} else if (x[i] < fullWidth * 0.5 && y[i] < fullHeight * 0.5) {
				posX = x_[i] + ax[i];
				posY = y_[i] + ay[i];
			}
		}
		x_[i] = posX;
		y_[i] = posY;
		cxt.arc(posX, posY, particleRadius, 0, Math.PI * 2, true);
		cxt.fill();
		planearea(plnX, plnY, 3);
	}
}


function drawplane(x, y, r) {
	cxt.fillStyle = "black";
	cxt.fillRect(0, 0, fullWidth, fullHeight);
	cxt.beginPath();
	cxt.fillStyle = "#9d928c";
	cxt.fillRect(x, y, r, r);
	cxt.fillRect(x - r, y + r, 3 * r, 4 * r);
	cxt.fillRect(x - 2 * r, y + 3 * r, r, r);
	cxt.fillRect(x + 2 * r, y + 3 * r, r, r);
	cxt.fillRect(x - 3 * r, y + 5 * r, r, 10 * r);
	cxt.fillRect(x + 3 * r, y + 5 * r, r, 10 * r);
	cxt.fillRect(x - 2 * r, y + 15 * r, 5 * r, r);
	cxt.fillRect(x - 2 * r, y + 16 * r, 5 * r, r);
	cxt.fillStyle = "#ede8e4";
	cxt.fillRect(x, y + 2 * r, r, 2 * r);
	cxt.fillRect(x - 2 * r, y + 4 * r, r, r);
	cxt.fillRect(x + 2 * r, y + 4 * r, r, r);
	for (var i = 0; i < 7; i++) {
		cxt.fillRect(x - (10 - i) * r, y + (12 - i) * r, r, (i + 1) * r);
	}
	cxt.fillRect(x - 2 * r, y + 5 * r, 5 * r, 10 * r);
	for (var i = 0; i < 7; i++) {
		cxt.fillRect(x - (i - 10) * r, y + (12 - i) * r, r, (i + 1) * r);
	}
	cxt.fillRect(x - r, y + 15 * r, 3 * r, r);
	cxt.fillStyle = "#515698";
	cxt.fillRect(x, y + 5 * r, r, 11 * r);
	cxt.fillStyle = "#dd3a33";
	cxt.fillRect(x - 5 * r, y + 9 * r, r, r);
	cxt.fillRect(x + 5 * r, y + 9 * r, r, r);
	cxt.fillRect(x - 9 * r, y + 14 * r, 5 * r, 2 * r);
	cxt.fillRect(x + 5 * r, y + 14 * r, 5 * r, 2 * r);
	cxt.fillRect(x - 8 * r, y + 16 * r, 3 * r, r);
	cxt.fillRect(x + 6 * r, y + 16 * r, 3 * r, r);
	cxt.fillRect(x - 7 * r, y + 17 * r, r, r);
	cxt.fillRect(x + 7 * r, y + 17 * r, r, r);
	cxt.fillStyle = "#f3932f";
	cxt.fillRect(x - 8 * r, y + 14 * r, 3 * r, r);
	cxt.fillRect(x - 7 * r, y + 15 * r, r, r);
	cxt.fillRect(x + 6 * r, y + 14 * r, 3 * r, r);
	cxt.fillRect(x + 7 * r, y + 15 * r, r, r);
	cxt.fillStyle = "#9d928c";
	cxt.fillRect(x - 8 * r, y + 12 * r, r, r);
	cxt.fillRect(x - 6 * r, y + 12 * r, r, r);
	cxt.fillRect(x + 8 * r, y + 12 * r, r, r);
	cxt.fillRect(x + 6 * r, y + 12 * r, r, r);
	cxt.fillRect(x - 9 * r, y + 13 * r, 5 * r, r);
	cxt.fillRect(x + 5 * r, y + 13 * r, 5 * r, r);
}


function planearea(x, y, r) {
	var plaX = [1, 1, 2, 2, 3, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 10, 10, 9, 9, 8, 8, 7, 7, 6, 6, 5, 5, 4, 4, 3, 3, -2, -2, -3, -3, -4, -4, -5, -5, -6, -6, -7, -7, -8, -8, -9, -9, -10, -10, -9, -9, -9, -8, -8, -7, -7, -6, -6, -5, -5, -4, -4, -3, -3, -2, -2, -1, -1, 0, 0];
	var plaY = [0, 1, 1, 3, 3, 3, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 16, 16, 17, 17, 18, 18, 17, 17, 16, 16, 13, 13, 15, 15, 17, 17, 15, 15, 13, 13, 16, 16, 17, 17, 18, 18, 17, 17, 16, 16, 13, 13, 12, , 12, 11, 11, 10, 10, 9, 9, 8, 8, 7, 7, 6, 6, 5, 5, 3, 3, 1, 1, 0];
	cxt.beginPath();
	cxt.moveTo(x, y);
	for (var i = 0, l = plaX.length; i < l; i++) {
		ix = plaX[i];
		iy = plaY[i];
		cxt.lineTo(x + ix * r, y + iy * r);
	}
	if (cxt.isPointInPath(posX,posY)){
	   		clearInterval(dot);
	   		clearInterval(dotup);
	   		alert("游戏结束，共完成"+(dotnum-3)+"关");
	   		window.location.reload();
	   		moveplane=function () {
	   			
	   		}
	    };
	    cxt.closePath();
}
var moveL = null,
	moveU = null,
	moveR = null,
	moveD = null

function moveplane(event) {
	if (event.keyCode == 37) {
		if (!!moveL) {
			return
		} else {
			moveL = setInterval(function() {
				plnX -= plnX == 0 ? 0 : 8;
				drawplane(plnX, plnY, 3);
				dotrec()
			}, 30)
		}
	} //左
	if (event.keyCode == 38) {
		if (!!moveU) {
			return
		} else {
			moveU = setInterval(function() {
				plnY -= plnY < 0 ? 0 : 8;
				drawplane(plnX, plnY, 3);
				dotrec()
			}, 30)
		}
	} //上
	if (event.keyCode == 39) {
		if (!!moveR) {
			return
		} else {
			moveR = setInterval(function() {
				plnX += plnX == fullWidth ? 0 : 8;
				drawplane(plnX, plnY, 3);
				dotrec()
			}, 30)
		}
	} //右
	if (event.keyCode == 40) {
		if (!!moveD) {
			return
		} else {
			moveD = setInterval(function() {
				plnY += plnY > fullHeight - 60 ? 0 : 8;
				drawplane(plnX, plnY, 3);
				dotrec()
			}, 30)
		}
	} //下

}

function dotrec() {
	for (var i = 0; i < 100; i++) {
		cxt.beginPath();
		cxt.fillStyle = "aqua";
		cxt.arc(x_[i], y_[i], particleRadius, 0, Math.PI * 2, true);
		cxt.fill();
	}
}

function clearmove(event) {
	switch (event.keyCode) {
		case 37:
			clearInterval(moveL);
			moveL = null;
			break;
		case 38:
			clearInterval(moveU);
			moveU = null;
			break;
		case 39:
			clearInterval(moveR);
			moveR = null;
			break;
		case 40:
			clearInterval(moveD);
			moveD = null;
			break;
	}
}
