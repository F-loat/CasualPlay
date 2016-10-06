document.getElementById("inputNumber").value
var blockBox = document.getElementById("blockBox")
var eblock = document.getElementsByClassName("block")
	/*for (i = 0; i < eblock.length; i++) {
		eblock[i].onclick = function() {
			removeBlock(this)
		}
	}*/

function addBlock(direction) {
	var node = document.createElement("li");
	node.className = "block"
	node.onclick = function() {
		removeBlock(this)
	}
	var text = document.createTextNode(document.getElementById("inputNumber").value);
	node.appendChild(text);
	if (direction === 'right') {
		blockBox.appendChild(node)
	} else if (direction === 'left') {
		blockBox.insertBefore(node, eblock[0])
	}
}

function removeBlock(Element, judge) {
	var target = getEventTarget();
	if (judge === 'i') {
		alert(Element.innerText)
	}
	if (Element) {
		Element.style.opacity = "0"
		setTimeout(
			function() {
				blockBox.removeChild(Element)
			}, 500)
	} else {
		target.style.opacity = "0"
		setTimeout(
			function() {
				blockBox.removeChild(target)
			}, 500)
	}
}

function getEventTarget(e) {
	e = e || window.event;
	return e.target || e.srcElement;
}