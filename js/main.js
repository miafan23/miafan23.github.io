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
        }, 10)
    },
    showMain: function () {
        var main = document.getElementById(defaults.main);
        var timer = setTimeout(function () {
            fadeIn(main, 30)
        }, 20)
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
function scrollInertia (target) {
    var speed;
    clearInterval(timerBodyScroll)
    timerBodyScroll = setInterval(function () {
        if ($('body').scrollTop == target) {
                clearInterval(timerBodyScroll);
            } else {
                speed = (target-$('body').scrollTop)/20;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
                $('body').scrollTop += speed;
            }
        },5)
}
var timerImages;
var top;
$.mouseWheel('#images', function (delta, target) {
    // var speed = 1;
    // var moveDis = 0;
    // var wrapper = document.getElementById(defaults.imagesWrapper)
    // top = parseInt(window.getComputedStyle(wrapper, null).getPropertyValue('top'));
    // clearInterval(timerImages)
    // if (delta<0) {
    //     //target.style.transform = 'translate3d('+50+'px, 0, 0)';
    //     console.log(delta)
    //     timerImages = setInterval(function () {
    //         if (moveDis == 100*(delta/-120)) {
    //             clearInterval(timerImages)
    //         } else {
    //             moveDis += 1;
    //             wrapper.style.top = top - moveDis + 'px';
    //         }
    //     }, 5)
        
    // }
    // else if (delta > 0) {
    //     top += 200;
    //     wrapper.style.top = top + 'px';
    // };
    
    imageScroll.onMouseWheel(100, delta/120)
    
})

var ImageScroll = function (parent, children, distance) {
    var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    var _this = this;
    this.dis = distance[0];
    this.stopped = true;
    this.parentHeight = parent.offsetHeight;

    this.id = 0;
    this.yPosition = 0;
    var _enterYp = 0;

    this.onEnterframe = function() {
        //_enterYp += (_this.yPosition - parseInt($(parent).css("top"))) / _s;
        _enterYp = _this.yPosition
        parent.style.top = parseInt(_enterYp) + "px";
        console.log(parent.style.top)
        //_this.id = requestAnimationFrame(_this.onEnterframe);
    }

    return {
        onMouseWheel: function (distance, direction) {
            var top = parseInt(parent.style.top);
            var moveDistance = 0;
            var n = 0;
            var childHeight = 0;
            var child;
            var _enterYp = 0;

            if (!_this.stopped) {
                moveDistance = distance*parseInt(direction);
                //n = _this.yPosition + moveDistance;
                //if (direction < 0 && n < clientHeight - _this.parentHeight) {
                // if (direction < 0) {
                //     console.log(_this.parentHeight)
                //     //while (n < clientHeight - _this.parentHeight + moveDistance) {
                //     while(n<0){
                //         child = children[0];
                //         childHeight = child.offsetHeight;
                //         parent.appendChild(child);
                //         _this.yPosition = _this.yPosition + childHeight - moveDistance;
                //         _enterYp += childHeight;
                //         parent.style.top = _enterYp + "px";
                //         n = _this.yPosition;
                //     }
                // }

                 //if (direction>0) {
                    // var childrenLength = children.length;
                    // while (n > 0) {
                    //     child = children[childrenLength - 1] || children[0];
                    //     childHeight = child.offsetHeight;
                    //     parent.insertBefore(child, children[0]);
                    //     _this.yPosition = _this.yPosition - childHeight + moveDistance;
                    //     _enterYp -= childHeight;
                    //     parent.style.top = _enterYp + "px";
                    //     n = _this.yPosition;
                    // }
                //} else {
                    _this.yPosition += moveDistance;
                    console.log(_this.yPosition);
                    _this.id = requestAnimationFrame(_this.onEnterframe);
                //}
            };
        },

        start: function() {
            if (_this.stopped) {
                _this.id = requestAnimationFrame(_this.onEnterframe);
                _this.stopped = false;
            }
        }
    }
}
var imageScroll = new ImageScroll($('#'+defaults.imagesWrapper), $('#'+defaults.imagesWrapper).getElementsByTagName('li'), [100]);
imageScroll.start();
$.on('#about', 'click', function () {
    var about = $('#about-content')
    var width = parseInt(window.getComputedStyle(about, null).getPropertyValue('width'));
    if (width === 0) {
        about.style.width = '100%';
        //$('#about').style['border-top'] = '1px solid #232323'
    } else {
        about.style.width = '0';
        //$('#about').style['border-top'] = '1px solid #fff'
    }
})

})();

