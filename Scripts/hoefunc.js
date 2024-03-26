function findpos(obj) {
	var curtop = 0;
	if (obj.offsetParent) {
		do {
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
		return curtop;
	}
}

function GoTo(obj) {
	var ot = findpos(obj);
	//window.scrollTo(0,ot-75);
	window.scrollTo(0, ot);
}

function removeThis(jNode) {
	jNode.remove()
}

function qs(c, s) {
	if (s) {
		return c.querySelector(s)
	} else {
		return document.querySelector(c)
	}
}

function qsa(c, s) {
	if (s) {
		return c.querySelectorAll(s)
	} else {
		return document.querySelectorAll(c)
	}
}

function clickz(obj) {
	triggerEvent(obj, "popstate");
	triggerEvent(obj, "focus");
	triggerEvent(obj, "touchstart");
	triggerEvent(obj, "click");
}

function copyToClipboard(inputname) {
	navigator.clipboard.writeText(inputname)
}

function qsit(selector, text) {
	return Array.from(document.querySelectorAll(selector))
	.find(el => el.textContent.includes(text));
}

function containsAnyString(str, substrings) {
	for (var i = 0; i != substrings.length; i++) {
		var substring = substrings[i];
		if (str.indexOf(substring) != -1) {
			return substring;
		}
	}
	return null;
}

function containsAnyStringLower(str, substrings) {
	for (var i = 0; i != substrings.length; i++) {
		var substring = substrings[i].toLowerCase()
			if (str.indexOf(substring) != -1) {
				return substring;
			}
	}
	return null;
}

function containsAnyTrue(str, substrings) {
	for (var i = 0; i != substrings.length; i++) {
		var substring = substrings[i];
		if (str.indexOf(substring) != -1) {
			return true;
		}
	}
	return false;
}

function triggerEvent(node, eventType) {
	var clickEvent = document.createEvent('MouseEvents');
	clickEvent.initEvent(eventType, true, true);
	node.dispatchEvent(clickEvent);
}

function replaceVal(selector, value) {
	const el = document.querySelector(selector);
	console.log("replaceValue");
	if (el) {
		el.focus();
		el.select();
		if (!document.execCommand('insertText', false, value)) {
			// Fallback for Firefox: just replace the value
			el.value = 'new text';
		}
		el.dispatchEvent(new Event('change', {
				bubbles: true
			})); // usually not needed
	}
	return el;
}

function getPageFromUrl(url) {
	const match = url.match(/(?:\/page\/|[?&]page=|page-)([1-9]\d*)/)
		if (match) {
			return Number(match[1]);
		}
		return 1;
}

function getString(url, regg) {
	const match = url.match(regg)
		if (match) {
			return match[1]
		}
		return null
}

function CE(type, text, floatclass, floatid, floatstyle) {
	const button = document.createElement(type)
		if (text !== undefined)
			button.textContent = text;
		if (floatclass !== undefined)
			button.className = floatclass;
		if (floatid !== undefined)
			button.id = floatid;
		if (floatstyle !== undefined)
			button.style = floatstyle; //button.style = "clear: left"
		return button
}

function CA(text, floathref, floatclass, floatid, floatstyle, floattarg) {
	const button = document.createElement('a')
		if (text !== undefined)
			button.textContent = text;
		if (floatclass !== undefined)
			button.className = floatclass;
		if (floatid !== undefined)
			button.id = floatid;
		if (floatstyle !== undefined);
		button.style = floatstyle;
	if (floathref !== undefined)
		button.href = floathref;
	if (floattarg !== undefined)
		button.target = floattarg; //button.style = "clear: left"
	return button
}

function addFloatButtonss(text, floatclass, floatid, floatstyle) {
	const button = document.createElement('button')
		if (text !== undefined)
			button.textContent = text;
		if (floatclass !== undefined)
			button.className = floatclass;
		if (floatid !== undefined)
			button.id = floatid;
		if (floatstyle !== undefined)
			button.style = floatstyle;
		//button.style = "clear: left"
		return button
}

function CreateLinkButton(namer, linker, noder) {
	const akkk = document.createElement("div");
	akkk.className = 'nav-linker'
		akkk.innerHTML = '<a class="linker" href="' + linker + '">' + namer + '</a>'
		noder.append(akkk)
}

function waitforclickthis(test) {
	waitForKeyElements(test, sexyclick)

	function sexyclick(jNode) {
		jNode.click()
		var clickEvent = document.createEvent('MouseEvents');
		clickEvent.initEvent('click', true, true);
		jNode[0].dispatchEvent(clickEvent);
	}
}

function ClickThis(jNode) {
	// jNode.click()
	var clickEvent = document.createEvent('MouseEvents');
	clickEvent.initEvent('click', true, true);
	jNode.dispatchEvent(clickEvent);
}

function getInnermostHover() {
	var n = document.querySelector(":hover");
	var nn;
	while (n) {
		nn = n;
		n = nn.querySelector(":hover");
	}
	return nn
}
Element.prototype.appendBefore = function (element) {
	element.parentNode.insertBefore(this, element);
}, false;

Element.prototype.appendAfter = function (element) {
	element.parentNode.insertBefore(this, element.nextSibling);
}, false;

function RecursiveUnbind($jElement) {
	$jElement.unbind();
	$jElement.removeAttr('onclick');
	$jElement.children().each(function () {
		RecursiveUnbind($(this));
	});
}

function saveData() {
	var asdasd = document.createElement("a");
	document.body.appendChild(asdasd);
	asdasd.style = "display: none";
	return function (data, fileName) {
		var blob = new Blob([data], {
			type: "octet/stream"
		});
		var url = window.URL.createObjectURL(blob);
		asdasd.href = url;
		asdasd.download = fileName;
		asdasd.click();
		window.URL.revokeObjectURL(url);
	};
}
const isChromeUserScript = navigator.userAgent.includes("Chrome") && typeof unsafeWindow != "undefined",
    isFFuserScript = navigator.userAgent.includes("Firefox") && typeof unsafeWindow != "undefined",
    isFFtmScript = isFFuserScript && GM_info.scriptHandler == "Tampermonkey";
	
localStorage.alertQueue = JSON.stringify([]);
localStorage.notifyProps = JSON.stringify({
    queue: {
        topRight: [],
        bottomRight: [],
        bottomLeft: [],
        topLeft: []
    },
    lastNthAudio: 0
});
async function notify(msg, position, notifDuration, shadow) {
	let cjsMessages;
	notifDuration = notifDuration ? +notifDuration : 1.75;
	const fadeDuration = .3,
		  vpYoffset = 23,
		  vpXoffset = 27;
	const notificationDiv = document.createElement("div");
	notificationDiv.id = Math.floor(randomFloat() * 1e6) + Date.now();
	notificationDiv.classList.add("hoecat-notif");
	notificationDiv.innerText = msg;
	document.body.append(notificationDiv);
	const closeBtn = document.createElement("div");
	closeBtn.title = cjsMessages?.tooltip_dismiss || "Dismiss";
	closeBtn.classList.add("notif-close-btn");
	const closeSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	closeSVG.setAttribute("height", "8px");
	closeSVG.setAttribute("viewBox", "0 0 14 14");
	closeSVG.setAttribute("fill", "none");
	closeSVG.style.height = closeSVG.style.width = "8px";
	const closeSVGpath = document.createElementNS("http://www.w3.org/2000/svg", "path");
	closeSVGpath.setAttribute("fill-rule", "evenodd");
	closeSVGpath.setAttribute("clip-rule", "evenodd");
	closeSVGpath.setAttribute("fill", "white");
	closeSVGpath.setAttribute("d", "M13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893C13.3166 -0.0976312 12.6834 -0.0976312 12.2929 0.292893L7 5.58579L1.70711 0.292893C1.31658 -0.0976312 0.683417 -0.0976312 0.292893 0.292893C-0.0976312 0.683417 -0.0976312 1.31658 0.292893 1.70711L5.58579 7L0.292893 12.2929C-0.0976312 12.6834 -0.0976312 13.3166 0.292893 13.7071C0.683417 14.0976 1.31658 14.0976 1.70711 13.7071L7 8.41421L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L8.41421 7L13.7071 1.70711Z");
	closeSVG.append(closeSVGpath);
	closeBtn.append(closeSVG);
	notificationDiv.append(closeBtn);
	notificationDiv.isTop = !position || !/low|bottom/i.test(position);
	notificationDiv.isRight = !position || !/left/i.test(position);
	notificationDiv.quadrant = (notificationDiv.isTop ? "top" : "bottom") + (notificationDiv.isRight ? "Right" : "Left");
	const thisUpdated = 20231110;
	let notifStyle = document.querySelector("#hoecat-notif-style");
	if (!notifStyle || parseInt(notifStyle.getAttribute("last-updated"), 10) < thisUpdated) {
		if (!notifStyle) {
			notifStyle = document.createElement("style");
			notifStyle.id = "hoecat-notif-style";
			notifStyle.setAttribute("last-updated", thisUpdated.toString());
			document.head.append(notifStyle)
		}
		notifStyle.innerText = ".hoecat-notif {" + "background-color: black ; padding: 5px 8px 5px 8px ; border-radius: 11px ; border: 1px solid #f5f5f7 ;" + "opacity: 0 ; position: fixed ; z-index: 9999 ; font-size: 1.8rem ; color: white ;" + "-webkit-user-select: none ; -moz-user-select: none ; -ms-user-select: none ; user-select: none ;" + `transform: translateX(${!notificationDiv.isRight?"-":""}35px) ;` + (shadow ? "box-shadow: -8px 13px 25px 0 " + (/\b(shadow|on)\b/gi.test(shadow) ? "gray" : shadow) : "") + "}" + ".notif-close-btn { cursor: pointer ; float: right ; position: relative ; right: -4px ; margin-left: -3px ;" + "display: grid }" + "@keyframes notif-zoom-fade-out { 0% { opacity: 1 ; transform: scale(1) }" + "15% { opacity: 0.35 ; transform: rotateX(-27deg) scale(1.05) }" + "45% { opacity: 0.05 ; transform: rotateX(-81deg) }" + "100% { opacity: 0 ; transform: rotateX(-180deg) scale(1.15) }}"
	}
	let notifyProps = JSON.parse(localStorage.notifyProps);
	notifyProps.queue[notificationDiv.quadrant].push(notificationDiv.id);
	localStorage.notifyProps = JSON.stringify(notifyProps);
	notificationDiv.style.top = notificationDiv.isTop ? vpYoffset.toString() + "px" : "";
	notificationDiv.style.bottom = !notificationDiv.isTop ? vpYoffset.toString() + "px" : "";
	notificationDiv.style.right = notificationDiv.isRight ? vpXoffset.toString() + "px" : "";
	notificationDiv.style.left = !notificationDiv.isRight ? vpXoffset.toString() + "px" : "";
	const thisQuadrantQueue = notifyProps.queue[notificationDiv.quadrant];
	if (thisQuadrantQueue.length > 1) {
		try {
			for (const divId of thisQuadrantQueue.slice(0, -1)) {
				const oldDiv = document.getElementById(divId),
					  offsetProp = oldDiv.style.top ? "top" : "bottom",
					  vOffset = +/\d+/.exec(oldDiv.style[offsetProp])[0] + 5 + oldDiv.getBoundingClientRect().height;
				oldDiv.style[offsetProp] = `${vOffset}px`
                }
			} catch (err) {}
		}
	   setTimeout(() => {
		   notificationDiv.style.opacity = isDarkMode() ? .8 : .67;
		   notificationDiv.style.transform = "translateX(0)";
		   notificationDiv.style.transition = "transform 0.15s ease, opacity 0.15s ease"
	   }, 10);
	   const hideDelay = fadeDuration > notifDuration ? 0 : notifDuration - fadeDuration;
	   let dismissAudio, dismissAudioTID;
	   if (isFFtmScript) {
		   let nthAudio;
		   do {
			   nthAudio = Math.floor(Math.random() * 3) + 1
		   } while (nthAudio === notifyProps.lastNthAudio);
		   notifyProps.lastNthAudio = nthAudio;
		   localStorage.notifyProps = JSON.stringify(notifyProps);
		   dismissAudio = new Audio;
		   dismissAudio.src = "https://raw.githubusercontent.com/KudoAI/chatgpt.js/main/media/audio/notifications/bubble-pop/src/bubble-pop-1.wav"
		   dismissAudioTID = setTimeout(() => dismissAudio.play().catch(() => {}), hideDelay * 1e3)
	   }
	   const dismissNotif = () => {
		   notificationDiv.style.animation = `notif-zoom-fade-out ${fadeDuration}s ease-out`;
		   if (isFFtmScript) dismissAudio?.play().catch(() => {});
		   clearTimeout(dismissFuncTID);
		   clearTimeout(dismissAudioTID)
	   };
	   const dismissFuncTID = setTimeout(dismissNotif, hideDelay * 1e3);
	   closeSVG.addEventListener("click", dismissNotif, {
		   once: true
	   });
	   notificationDiv.addEventListener("animationend", () => {
		   notificationDiv.remove();
		   notifyProps = JSON.parse(localStorage.notifyProps);
		   notifyProps.queue[notificationDiv.quadrant].shift();
		   localStorage.notifyProps = JSON.stringify(notifyProps)
	   }, {
		   once: true
	   })
   }
    function isDarkMode(){
        return document.documentElement.classList.toString().includes("dark")
    }
    function randomFloat() {
        const crypto = window.crypto || window.msCrypto;
        return crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295
    }

function appendStyleToDocument(style) {
	const styleNode = document.createElement("style");
	styleNode.type = "text/css";
	styleNode.textContent = style;
	document.head.append(styleNode);
};
/*
var saveData = (function () {
var asdasd = document.createElement("a");
document.body.appendChild(asdasd);
asdasd.style = "display: none";
return function (data, fileName) {
var blob = new Blob([data], {type: "octet/stream"});
var url = window.URL.createObjectURL(blob);
asdasd.href = url;
asdasd.download = fileName;
asdasd.click();
window.URL.revokeObjectURL(url);
};
}());



const floatstyle =  `
#myContainer{
width:75px;
position: fixed;
top: 10%;
left: 6.5%;
z-index: 2147483647;
height: 0
}


#myButton:hover {
background: rgb(75, 75, 75);
}

#myButton {
width:100%;
float: left;
float-offset: 3em;
margin: 1px;
padding: 7px;
outline: 0;
border-radius: 5px;
background: #000;
border: 2px solid black;
border-color: #f00;
box-shadow: 0 1px 4px rgba(0, 0, 0, .1);
color: #fff;
font-size: 20px;
line-height: 10px;
transition: .3s
}

#myButton:active {
background: #696969;
box-shadow: 0 2px 5px rgba(0, 0, 0, .2)
}

#myButton:active {
transition: 0s
}

.plus-button-isOn {
border-color:rgb(230, 0, 230)!important
}
.plus-button-isOff{
border-color:rgb(0, 0, 0)!important
}
.FilterByTag {
margin: unset;
width:unset;
}
.tagList {
width:unset;
}
#myButtons {
width:100%;
float: left;
float-offset: 3em;
margin: 1px;
padding: 7px;
outline: 0;
border-radius: 5px;
background: #000;
border: 2px solid black;
border-color: #f00;
box-shadow: 0 1px 4px rgba(0, 0, 0, .1);
color: #fff;
font-size: 20px;
line-height: 10px;
transition: .3s
}

#myButtons:active {
background: #696969;
box-shadow: 0 2px 5px rgba(0, 0, 0, .2)
}

#myButtons:active {
transition: 0s
}
`*/
