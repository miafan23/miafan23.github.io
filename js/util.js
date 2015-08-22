//删除掉了测试用例

//判断arr是否为一个数组，并返回一个bool值
function isArray (arr) {
    var result = arr instanceof Array;
    return result;
}

var arr = [];

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    if(typeof fn == 'function'){
        return true;
    } else {
        return false;
    }
}

function isDate (date) {
    return date instanceof Date;
}

function isRegExp (regexp) {
    return regexp instanceof RegExp;
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等

//检测对象类型
function istype (ele) {
    if(ele===null) return "Null";
    if(ele===undefined) return "Undefined";
    return Object.prototype.toString.call(ele).slice(8,-1);
}

//深度克隆
function cloneObject(src) {
    var srcType = istype(src);
    var result,k;
    //判断需要克隆的对象是否是Object类型或者Array类型
    if(srcType === "Object" || srcType === "Array"){
        result = srcType === "Object"? {}:[];
        for(k in src){
            result[k] = cloneObject(src[k])
        }
        return result;
    } else if (srcType === "Function" || "RegExp"){//如果是函数或者正则表达式则不复制
        return false;
    } else {     //普通类型直接浅复制
        result = src;
        return result;
    }

}



// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var length = arr.length;
    var newArr = [];
    var k;//标记是否出现相同元素
    for (var i=0; i<length; i++){
        k = true;
        for(var j=0; j<i; j++){
            if (arr[i] == newArr[j]){
                k = false;
            }
        }
        if(k === true){
            newArr.push(arr[i])
        }
    }
    return newArr;
}


// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 先暂时不要简单的用一句正则表达式来实现
function trim(str) {
    if (istype(str) !== 'String'){return false;}
    var whitespace = "\t\n\r "
    var newstr = "";
    //去除头的空格
    for (var i=0; i<str.length;i++){
        //判断第一个不是空格的字符
        if (whitespace.indexOf(str.charAt(i)) == -1){
            newstr = str.slice(i);
            break;
        }
    }
    //去除尾的空格
    for (var j=newstr.length; j>0;j--){
        //判断最后一个不是空格的字符
        if(whitespace.indexOf(newstr.charAt(j)) == -1){
            newstr = newstr.slice(0,j+1);
            break;
        }
    }
    return newstr;
}


// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    //  if(!isArray(arr)){
    //     return false;
    // }
    // if(!isFunction(fn)){
    //     return false;
    //}
    for (var i=0; i<arr.length; i++){
        fn.call(this, arr[i], i)
    }
}


// 获取一个对象里面第一层元素的数量，返回一个整数
       
function getObjectLength(obj) {
    var key,
    a=0;
    for (key in obj){
        a += 1
    }
    return a;
}


// 判断是否为邮箱地址
function isEmail(emailStr) {
    var emailTest = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]$/;
    return emailTest.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    var phoneTest = /^1[0-9]{10}$/;
    return phoneTest.test(phone);
}

// 为dom增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    element.className += " "+ newClassName
    element.className = trim(element.className)
}

// 移除dom中的样式oldClassName
function removeClass(element, oldClassName) {
     element.className = element.className.replace(oldClassName,"");
     element.className = trim(element.className)
}


// 判断siblingNode和dom是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return element.parentNode == siblingNode.parentNode;
}

// 获取dom相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    return {x: element.scrollLeft, y:element.scrollTop}
}

//获取所有满足class选择器的所有dom，不是作业要求
function getByClass(selector, parent){
    var classResult = []
    if (parent) {
        parent = parent 
    } else {
        parent = document
    }
    var oClass = parent.getElementsByTagName('*')
    for (var i=0; i<oClass.length; i++){
        var classArr = trim(oClass[i].className).split(" ")
        for (var j = classArr.length - 1; j >= 0; j--) {
            if (classArr[j] === selector) {
                classResult.push(oClass[i]);
                break;
            }
        }
    }
    return classResult;
}
    

// 给一个dom绑定一个针对event事件的响应，响应函数为listener
$.on = function(selector, event, listener){
    //如果输入的是选择器，就转为dom
    if (typeof selector === 'string') {
        selector = $(selector)[0]
    }
    if (selector.addEventListener) {
        selector.addEventListener(event, listener, false);
    } else if(selector.attachEvent) {
        selector.attachEvent("on" + event, listener);
    } else {
        selector["on" + event] = listener;
    }
}


// 例如：
//function clicklistener(event) {
    
//}

// 移除dom对象对于event事件发生时执行listener的响应，当listener为空时，移除所有响应函数
$.un = function(selector, event, listener){
    if (typeof selector === 'string') {
        selector = $(selector)
    }
    if(listener){
        if (selector.removeEventListener) {
            selector.removeEventListener(event, listener, false);
        } else {
            selector.DetachEvent(event, listener);
        }
    } else {
        //通过复制节点移除所有响应函数
        var newElement = selector.cloneNode(true)
        selector.parentNode.replaceChild(newElement, selector);
    }
}

// 实现对click事件的绑定
$.click = function(selector, listener){
    $.on(selector,"click", listener)
}

// 实现对于按Enter键时的事件绑定
$.enter = function(selector, listener){
    $.on(selector,"onkeydown", function () {
        if(keyCode == 13){
            listener()
        } else {
            return false;
        }
    })
}

//滚轮事件
$.mouseWheel = function (selector, listener) {
    function handleMouseWheel (event) {
        var e = event || window.event;
        target = e.srcElement? e.srcElement : e.target;
        e.preventDefault();
        e.stopPropagation();
        var delta;
        if (e.wheelDelta) {
            delta = e.wheelDelta;
        }
        else {
            delta = -e.detail * 40;
        }
        //像下滚为负值
        listener(delta, target)
    }
    $.on(selector, "mousewheel", function (event) {
        handleMouseWheel(event)
    });
    $.on(selector, "DOMMouseScroll", function (event) {
        handleMouseWheel(event)
    })
}

// 先简单一些
function delegateEvent(selector, tag, eventName, listener) {
    $.on(selector, eventName, function (event) {
        var e = event || window.event;
        target = e.srcElement? e.srcElement : e.target;
        if(target.tagName.toLowerCase() === tag){
            //把被点击的元素和事件触发者传入
            listener(target, e);
        }
    })
}

$.delegate = delegateEvent;


// 判断是否为IE浏览器，返回-1或者版本号

function isIE() {

    var ua = navigator.userAgent;
    if (/MSIE ([^;]+)/.test(ua)) {
        return RegExp["$1"]
    } else {
        return -1;
    }
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var cookieText = encodeURIComponent(cookieName) + "=" + encodeURIComponent(cookieValue);
    if (expiredays instanceof Date){
        cookieText += "; expires=" + expiredays.toGMTString();
    }
}

// 获取cookie值
function getCookie(cookieName) {
    var cookieName = encodeURIComponent(cookieName) + "=",
        cookieStart = document.cookie.indexOf(cookieName);
        cookieValue = null;
    if (cookieStart > -1) {
        var cookieEnd = document.cookie.indexOf(";", cookieStart);
        if (cookieEnd == -1) {
            cookieEnd = document.cookie.length;
        }
        cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd))
    }s
    return cookieValue;
}

// 
function ajax(url, options) {
    // your implement
    if (!options.type) {
        options.type = "post"
    };
    var xhr = new XMLHttpRequest();
    if (options.type.toLowerCase() == "get") {
        url += (url.indexOf("?") == -1 ? "?" : "&");
        //记得改格式
        url += encodeURIComponent(options.data) + "=" + encodeURIComponent(options.data);
        xhr.open(options.type, url, true);
        xhr.send();
    } else if (options.type.toLowerCase() == "post") {
        xhr.open(options.type, url, true);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
        xhr.send(options.data);
    }
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            options.onsuccess(xhr.responseText, xhr)
        } else {
            options.onfail(xhr.responseText, xhr);
        }
        };
    }
}

function fadeOut (ele, speed) {
    var opacity = 1;
    var eachAdd = 1/speed
    var timer = setInterval(function () {
        opacity -= eachAdd;
        ele.style.opacity = opacity;
        if (opacity < 0) {
            ele.style.opacity = 0;
            clearInterval(timer);
            ele.style.display = 'none'
        };
    },speed);
}

function fadeIn (ele, speed) {
    var opacity = 0;
    var eachAdd = 1/speed;
    ele.style.display = 'block'
    var timer = setInterval(function () {
        opacity += eachAdd;
        ele.style.opacity = opacity;
        if (opacity > 1) {
            ele.style.opacity = 1;
            clearInterval(timer);
        };
    },speed);
}

function $(selector, context) {
    var idReg = /^#([\w_\-]+)/;
    var classReg = /^\.([\w_\-]+)/;
    var tagReg = /^\w+$/i;
    // [data-log]
    // [data-log="test"]
    // [data-log=test]
    // [data-log='test']
    var attrReg = /(\w+)?\[([^=\]]+)(?:=(["'])?([^\]"']+)\3?)?\]/;

    // 不考虑'>' 、`~`等嵌套关系
    // 父子选择器之间用空格相隔
    var context = context || document;

    function blank() {}
    function hasClass(element, className) {
        var classNames = element.className;
        if (!classNames) {
            return false;
        }
        classNames = classNames.split(/\s+/);
        for (var i = 0, len = classNames.length; i < len; i++) {
            if (classNames[i] === className) {
                return true;
            }
        }
        return false;
    }

    function direct(part, actions) {
        actions = actions || {
            id: blank,
            className: blank,
            tag: blank,
            attribute: blank
        };
        var fn;
        var params = [].slice.call(arguments, 2);
        // id
        if (result = part.match(idReg)) {
            fn = 'id';
            params.push(result[1]);
        }
        // class
        else if (result = part.match(classReg)) {
            fn = 'className';
            params.push(result[1]);
        }
        // tag
        else if (result = part.match(tagReg)) {
            fn = 'tag';
            params.push(result[0]);
        }
        // attribute
        else if (result = part.match(attrReg)) {
            fn = 'attribute';
            var tag = result[1];
            var key = result[2];
            var value = result[4];
            params.push(tag, key, value);
        }
        return actions[fn].apply(null, params);
    }

    function find(parts, context) {
        var part = parts.pop();

        var actions = {
            id: function (id) {
                return [
                    document.getElementById(id)
                ];
            },
            className: function (className) {
                var result = [];
                if (context.getElementsByClassName) {
                    result = context.getElementsByClassName(className)
                }
                else {
                    var temp = context.getElementsByTagName('*');
                    //console.log(temp)
                    for (var i = 0, len = temp.length; i < len; i++) {
                        var node = temp[i];
                        if (hasClass(node, className)) {
                            result.push(node);
                        }
                    }
                }
                return result;
            },
            tag: function (tag) {
                return context.getElementsByTagName(tag);
            },
            attribute: function (tag, key, value) {
                var result = [];
                var temp = context.getElementsByTagName(tag || '*');

                for (var i = 0, len = temp.length; i < len; i++) {
                    var node = temp[i];
                    if (value) {
                        var v = node.getAttribute(key);
                        (v === value) && result.push(node);
                    }
                    else if (node.hasAttribute(key)) {
                        result.push(node);
                    }
                }
                return result;
            }
        };

        var ret = direct(part, actions);

        // to array
        ret = [].slice.call(ret);

        return parts[0] && ret[0] ? filterParents(parts, ret) : ret;
    }

    function filterParents(parts, ret) {
        var parentPart = parts.pop();
        var result = [];

        for (var i = 0, len = ret.length; i < len; i++) {
            var node = ret[i];
            var p = node;

            while (p = p.parentNode) {
                var actions = {
                    id: function (el, id) {
                        return (el.id === id);
                    },
                    className: function (el, className) {
                         return hasClass(el, className);
                    },
                    tag: function (el, tag) {
                        return (el.tagName.toLowerCase() === tag);
                    },
                    attribute: function (el, tag, key, value) {
                        var valid = true;
                        if (tag) {
                            valid = actions.tag(el, tag);
                        }
                        valid = valid && el.hasAttribute(key);
                        if (value) {
                            valid = valid && (value === el.getAttribute(key))
                        }
                        return valid;
                    }
                };
                var matches = direct(parentPart, actions, p);

                if (matches) {
                    break;
                }
            }

            if (matches) {
                result.push(node);
            }
        }

        return parts[0] && result[0] ? filterParents(parts, result) : result;
    }

    var result = find(selector.split(/\s+/), context);
    return result;
}