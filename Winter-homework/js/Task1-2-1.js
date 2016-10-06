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
]

for (x = 0; x < 12; x++) {
	var aqiMonth = aqiData[x]
	var count = {
		"worst": 0,
		"worse": 0,
		"bad": 0,
		"good": 0,
	}
	for (var i = 0, len = aqiMonth.length; i < len; i++) {
		if (aqiMonth[i] < 100) {
			count.good++
		} else if (aqiMonth[i] < 150) {
			count.bad++
		} else if (aqiMonth[i] < 200) {
			count.worse++
		} else {
			count.worst++
		}
	}
	//数据准备完成，开始输出
	var sheet = ""
	sheet = '<li>'
	sheet += '<span class="month">' + (x + 1) + '月' + '</span>'
	sheet += '<span class="worst" style="width:' + count.worst * 12 + 'px"></span>'
	sheet += '<span class="worse" style="width:' + count.worse * 12 + 'px"></span>'
	sheet += '<span class="bad" style="width:' + count.bad * 12 + 'px"></span>'
	sheet += '<span class="good" style="width:' + count.good * 12 + 'px"></span>'
	sheet += '</li>'
	document.getElementById("sheet").innerHTML += sheet;
}

function change(t) {
	var tStyle = document.getElementsByClassName(t.className);
	var tDisp = tStyle[1].style.display;
	var tColor = tStyle[0].style.background;
	if (tDisp == "none") {
		for (i = 0; i < tStyle.length; i++) {
			tStyle[i].style.display = "inline-block";
		}
		t.style.cssText = "background:" + tColorB;
	} else {
		for (i = 0; i < tStyle.length; i++) {
			tStyle[i].style.display = "none";
		}
		t.style.cssText = "background:#fff";
		tColorB = tColor
	}
}

function days() {

}