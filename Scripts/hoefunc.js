
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
    var ot = findPos(obj);
    window.scrollTo(0,ot-75);
}
function removeThis(jNode) {
    jNode.remove()
}
function clickz(obj){
    triggerEvent (obj, "popstate");
    triggerEvent (obj, "focus");
    triggerEvent (obj, "touchstart");
    triggerEvent (obj, "click");
}

function copyToClipboard(inputname) {
    navigator.clipboard.writeText(inputname)
}
function qsit (selector, text){
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

function addFloatButtonss(text, floatclass, floatid, floatstyle) {
    const button = document.createElement('button')
    if (text !== undefined) button.textContent = text
    if (floatclass !== undefined) button.className = floatclass
    if (floatid !== undefined) button.id = floatid
    if (floatstyle !== undefined) button.style = floatstyle
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
Element.prototype.appendBefore = function(element) {
    element.parentNode.insertBefore(this, element);
}, false;

Element.prototype.appendAfter = function(element) {
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
    return function(data, fileName) {
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