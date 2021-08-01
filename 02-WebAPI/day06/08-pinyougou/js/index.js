window.addEventListener('load', function() {
    //1.获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var ul = focus.querySelector('ul');
    var ol = document.querySelector('.circle');
    var focusWidth = focus.offsetWidth;
    //鼠标经过显示按钮
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null; //清除定时器
    })
    focus.addEventListener('mouseleave', function() {
            arrow_l.style.display = 'none';
            arrow_r.style.display = 'none';
            timer = setInterval(function() {
                //手动调用点击事件 
                arrow_r.click();
            }, 2000);
        })
        //生成li
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        //记录小圆圈的当前索引号，通过自定义来做
        li.setAttribute('index', i);
        ol.appendChild(li);
        // circle.children[0].className = 'current';
        li.addEventListener('click', function() {
            for (var j = 0; j < ol.children.length; j++) {
                ol.children[j].className = '';
            }
            this.className = 'current';
            //点击小圆圈，移动图片，移动的是ul
            //移动的距离就是小圆圈的索引号乘以图片的宽度的负值
            //获得当前索引号
            var index = this.getAttribute('index');
            // 当我们点击了某个小li 就要把这个li 的索引号给 num  
            num = index;
            // 当我们点击了某个小li 就要把这个li 的索引号给 circle  
            circle = index;
            animate(ul, -index * focusWidth);
            // console.log(20);
        })

    }
    //把circle第一个小li设置类名为current
    ol.children[0].className = 'current';
    //克隆第一张图片放在ul最后
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //右侧按钮，点击图片换一张
    var num = 0;
    // 控制小圆点播放324
    var circle = 0;
    var flag = true; //节流阀
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false;
            //如果走到最后复制的一张，此时我们的ul要快速复原left改为0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
                circle = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function() {
                flag = true; //打开节流阀
            });
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    });
    // 左侧按钮
    arrow_l.addEventListener('click', function() {
        //如果走到最后复制的一张，此时我们的ul要快速复原left改为0
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                //因为是向左移动，所以是负的
                ul.style.left = -focusWidth * num + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            circle--;
            //如果circle<0，那么就等于小圆圈的长度减一
            if (circle == -1) {
                circle = ol.children.length - 1;
            }
            circleChange();
        }
    })

    function circleChange() {
        for (var j = 0; j < ol.children.length; j++) {
            ol.children[j].className = '';
        }
        ol.children[circle].className = 'current';
    }
    //定时器
    var timer = setInterval(function() {
        //手动调用点击事件 
        arrow_r.click();
    }, 2000);
})