(function () {
var defaults = {
    welcome: 'welcome',
    main: 'home-page',
    images: 'images',
    imagesWrapper: 'images-wrapper'
}
var init = {
    waite: function () {
        var c1 = document.getElementById(defaults.welcome);
        var ctx1 = c1.getContext('2d');

        var welcomRotate = {
            w: 250,
            h: 250,
            count: 85,
            rotation: 0,
            speed: 0.06,
            step: function () {
                welcomRotate.rotation += welcomRotate.speed;
            },
            draw: function () {
                ctx1.globalCompositeOperation = 'source-over';
                ctx1.save();
                ctx1.translate(125,125);
                ctx1.rotate(welcomRotate.rotation);
                var i = welcomRotate.count;
                    while( i-- ) {
                    ctx1.beginPath();
                    ctx1.arc(0, 0, i+(Math.random()*35), Math.random(), Math.PI/3+(Math.random()/12));
                    ctx1.stroke();
                }
                ctx1.restore();
            },
            loop: function () {
                requestAnimationFrame(welcomRotate.loop);
                ctx1.globalCompositeOperation = 'destination-out';
                ctx1.fillStyle = 'rgba(0, 0, 0, 0.03)';
                ctx1.fillRect( 0, 0, welcomRotate.w, welcomRotate.h );
                welcomRotate.step();
                welcomRotate.draw();
            }
        }
        c1.width = welcomRotate.w;
        c1.height  = welcomRotate.h;
        ctx1.strokeStyle = 'rgba(0, 0, 0, 0.75)';
        ctx1.lineWidth = 0.5;
        welcomRotate.loop();
    },
    hideWelcome: function () {
        var welcome = document.getElementById(defaults.welcome);
        var timer = setTimeout(function () {
            fadeOut(welcome, 50)
        }, 1000)
    },
    showMain: function () {
        var main = document.getElementById(defaults.main);
        var timer = setTimeout(function () {
            fadeIn(main, 30)
        }, 4000)
    },
    setStyle: function () {

    }
}
init.waite();
init.hideWelcome();
init.showMain();
init.setStyle();
var timerBodyScroll;
$.mouseWheel('body', function (delta) {
    if (delta < 0) {
        scrollInertia(200)
    }
    else if (delta > 0) {
        scrollInertia(0)
    };
})
$.mouseWheel('body', function (delta, target) {
    imageScroll.onMouseWheel(100, delta/120)
})
function scrollInertia (target) {
    var speed = 0;
    var nowScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    clearInterval(timerBodyScroll);
    timerBodyScroll = setInterval(function () {
        if (nowScrollTop == target) {
                clearInterval(timerBodyScroll);
            } else {
                speed = (target-nowScrollTop)/50;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
                nowScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                nowScrollTop += speed;
                document.documentElement.scrollTop = nowScrollTop;
                document.body.scrollTop = nowScrollTop;
            }
        },1)
}

var ImageScroll = function (parent, children, distance) {
    var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

    var _this = this;
    this.dis = distance[0];
    this.stopped = true;
    this.timer = 0;
    this.yPosition = 0;
    var _enterYp = 0;

    this.onEnterframe = function() {
        var top = window.getComputedStyle(parent, null).getPropertyValue("top")
        _enterYp += (_this.yPosition - parseInt(top)) / 30;
        parent.style.top = parseInt(_enterYp) + "px";
        setTimeout(_this.onEnterframe, 1);
    }

    return {
        start: function() {
            if (_this.stopped) {
                _this.timer = setTimeout(_this.onEnterframe, 1);
                _this.stopped = false;
            }
        },
        onMouseWheel: function (distance, direction) {
            var top = parseInt(parent.style.top);
            //滚动一次移动的距离
            var moveDistance = 0;
            var n = 0;
            var childHeight = 0;
            var child;
            _this.parentHeight = parent.offsetHeight
            if (!_this.stopped) {
                moveDistance = distance*parseInt(direction);
                n = _this.yPosition + moveDistance;
                //如果向下滚到底了
                if (direction < 0 && n < document.documentElement.scrollHeight - _this.parentHeight) {
                    while (n < document.documentElement.scrollHeight - _this.parentHeight) {
                        child = children[0];
                        childHeight = child.offsetHeight;
                        //将第一张图片放到最后
                        parent.appendChild(child);
                        _this.yPosition = _this.yPosition + childHeight - moveDistance;
                        //瞬间改变top值
                        _enterYp += childHeight;
                        parent.style.top = _enterYp + "px";
                        n = _this.yPosition;
                    }
                }
                //如果向上滚到顶了
                 if (n > 0) {
                    var childrenLength = children.length;
                    while (n > 0) {
                        child = children[childrenLength - 1];
                        childHeight = child.offsetHeight;
                        //将最后一张图片放在第一张图片前面
                        parent.insertBefore(child, children[0]);
                        _this.yPosition = _this.yPosition - childHeight + moveDistance;
                        _enterYp -= childHeight;
                        parent.style.top = _enterYp + "px";
                        n = _this.yPosition;
                    }
                } else {
                    _this.yPosition += moveDistance;    
                }
            }
        },
        stop: function() {
            _this.stopped = true;
            clearTimeout(_this.timer);
        }
    }
}
var imageScroll = new ImageScroll($('#'+defaults.imagesWrapper)[0], $('#'+defaults.imagesWrapper)[0].getElementsByTagName('li'), [100]);
//开定时器
imageScroll.start();

})();