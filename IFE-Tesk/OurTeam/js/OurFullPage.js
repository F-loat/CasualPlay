var setDom = document.getElementsByClassName("setHeight");
var setSum = setDom.length;
var scroll = 0;
var scrollOld = 0;
var FullHeight = document.documentElement.clientHeight;

function setHeight() {
	var FullHeight = document.documentElement.clientHeight;
	for (i = 0; i < setSum; i++) {
		setDom[i].style.cssText = "height:" + FullHeight + "px";
	}
}

window.onload = function() {
	setHeight();
	document.body.onmousewheel = function(event) {
		event = event || window.event;
		if (event.wheelDelta > 0) {
			scrollOld=0
			for (i = 0; i < setSum; i++) {
				var DomTop = document.getElementsByClassName("setHeight")[i].offsetTop;
				if (DomTop <= window.pageYOffset&&DomTop+FullHeight>=window.pageYOffset) {
					window.scrollTo(0, DomTop);
					scrollOld=DomTop
					break;
				} else {
					
				}
			}
		}
		if (event.wheelDelta < 0) {
			for (i = 0; i < setSum; i++) {
				var DomTop = document.getElementsByClassName("setHeight")[i].offsetTop;
				if (DomTop > window.pageYOffset&&DomTop-FullHeight<=window.pageYOffset) {
					var interval = setInterval(function() {
						if (DomTop > window.pageYOffset) {
							var scroll = ((DomTop - window.pageYOffset) / 10) + scrollOld;
							window.scrollTo(0, scroll)
							scrollOld = scroll
						} else {
							clearInterval(interval)
						}
					}, 10)
					break;
				} else {
					clearInterval(interval)
				}
			}
		}
		return false;
	}
	document.body.addEventListener("DOMMouseScroll", function(event) {
		event = event || window.event;
		for (i = 0; i < setSum; i++) {
			var DomTop = document.getElementsByClassName("setHeight")[i].offsetTop;
			if (DomTop > window.pageYOffset) {
				window.scrollTo(0, DomTop)
				break;
			} else {

			}
		}
		event.preventDefault();
	}, false)
}
window.onresize = function() {
	setHeight()
}