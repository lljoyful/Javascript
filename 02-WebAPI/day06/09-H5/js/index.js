window.addEventListener('load', function() {
    //1.获取元素
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    //获取focus的宽度
    var w = focus.offsetWidth;
    var ol = focus.children[1];
    var index = 0;
    var timer = setInterval(function() {
        index++;
        var translatex = -index * w;
        ul.style.transition = 'all .3s';
        ul.style.transform = 'translateX(' + translatex + 'px)';
    }, 2000);
    //等着我们过渡完成之后，在判断监听完成的事件 transitionend
    ul.addEventListener('transitionend', function() {
        // console.log(1);
        if (index >= ul.children.length - 2) {
            index = 0;
            //去掉过渡效果，让ul快速的跳到目标位置
            ul.style.transition = 'none';
            //利用最新的索引号乘以宽度去滚动图片
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        } else if (index < 0) {
            index = 2;
            //去掉过渡效果，让ul快速的跳到目标位置
            ul.style.transition = 'none';
            //利用最新的索引号乘以宽度去滚动图片
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }
        //3.小圆点跟随变化效果
        // 把ol里面li带有current类名的选出来去掉类名remove
        ol.querySelector('.current').classList.remove('current');
        // 让当前索引号的小li加上current add
        ol.children[index].classList.add('current');
    });
    //4.手指滑动轮播图
    // 触摸元素touchstart: 获取 手指初始坐标
    var startX = 0;
    var moveX = 0;
    var flag = false;
    ul.addEventListener('touchstart', function(e) {
        startX = e.targetTouches[0].pageX;
        clearInterval(timer);
    });
    // 移动手指touchmove:计算手指的滑动距离，并 且移动盒子
    ul.addEventListener('touchmove', function(e) {
        moveX = e.targetTouches[0].pageX - startX;
        //移动盒子
        var translatex = -index * w + moveX;
        //手指拖动的时候不需要动画效果
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
        flag = true;
        e.preventDefault(); //阻止滚动屏幕的行为
    });
    ul.addEventListener('touchend', function(e) {
        if (flag) {
            flag = false;
            //如果移动距离大于50px我们就播放上一张或者下一张
            if (Math.abs(moveX) > 50) {
                //右滑,播放上一张
                if (moveX > 0) {
                    index--;
                }
                //左滑,播放下一张
                else {
                    index++;
                }
            }
            var translatex = -index * w;
            //手指拖动的时候不需要动画效果
            //注意：因为添加动画，所以才会和上边的transitionend联系起来，每次播放完一张都会对index进行判断
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }
        //手指离开重新开启定时器
        clearInterval(timer);
        timer = setInterval(function() {
            index++;
            var translatex = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }, 2000);
    });

    //返回顶部
    var goback = document.querySelector('.goback');
    var nav = document.querySelector('nav');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset >= nav.offsetTop) {
            goback.style.display = 'block';

        } else {
            goback.style.display = 'none';
        }
    });
    goback.addEventListener('click', function() {
        window.scroll(0, 0);
    });
})