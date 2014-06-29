(function () {
    'use strict';

    var prev = document.getElementById('prev'),
        next = document.getElementById('next'),
        slide = document.getElementById('slide'),
        slider = document.getElementById('slider'),
        btns = document.getElementById('btns').getElementsByTagName("li"),
        index = 1,
        timer = null,
        animated = false;

    // 鼠标划过
    slider.onmouseover = stop;
    slider.onmouseout = play;

    next.onclick = function () {
        if (index == 5) {
            index = 1;
        } else {
            index++;
        }

        if (!animated) {
            animate(-480);
        }

        showBtns();
    };

    prev.onclick = function () {
        if (index == 1) {
            index = 5;
        } else {
            index--;
        }

        if (!animated) {
            animate(480);
        }

        showBtns();
    }

    for (var i = 0; i < btns.length; i++) {
        btns[i].onclick = function () {
            if (this.className == 'active') {
                return;
            }

            // 点击btns的index
            var myIndex = parseInt(this.getAttribute('index'), 10);
            var offset = (myIndex - index) * (-480);

            if (!animated) {
                animate(offset);

                index = myIndex;
                showBtns();
            }
        }
    }

    function animate(offset) {
        animated = true;
        var newLeft = parseInt(slide.style.left, 10) + offset;
        console.log(newLeft);

        // animate effect
        var time = 200;
        var interval = 10;
        var speed = Math.floor(offset / (time / interval));

        function go() {
            if ((speed > 0 && parseInt(slide.style.left, 10) < newLeft) 
                || (speed < 0 && parseInt(slide.style.left, 10) > newLeft)) {
                slide.style.left = parseInt(slide.style.left, 10) + speed + 'px';
                setTimeout(go, interval);
            } else {
                animated = false;
                slide.style.left = newLeft + 'px';

                console.log(newLeft);

                if (newLeft > -480) {
                    slide.style.left = -2400 + 'px';
                }

                if (newLeft < -2400) {
                    slide.style.left = -480 + 'px';
                }


            }
        }

        go();
    }

    function showBtns() {
        for (var i = 0; i < btns.length; i++) {

            // remove clasaName if not current btn
            if (btns[i].className == "active") {
                btns[i].className = "";
                break;
            }
        }

        btns[index - 1].className = "active";
    }

    function play() {
        timer = setInterval(function () {
            // next.onclick();
        }, 3000);
    }

    function stop() {
        clearInterval(timer);
    }

    play();
})();