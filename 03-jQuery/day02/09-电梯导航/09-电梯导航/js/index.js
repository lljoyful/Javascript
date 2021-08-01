$(function() {
    //当我们点击了小li此时不需要执行页面滚动事件里面的li的背景选择添加current
    //节流阀 互斥锁
    var flag = true;
    var recommendTop = $(".recommend").offset().top;
    scrollD();
    $(window).scroll(function() {
        scrollD();
        //页面滚动到某个内容区域，左侧电梯导航小1i相应添加和删除current类名
        if (flag) {
            $(".floor>div").each(function(i, e) {
                if ($(document).scrollTop() >= $(e).offset().top) {
                    // 这是个多次选择，通通选择尾的过程
                    $(".fixedtool li").eq(i).addClass("current").siblings().removeClass("current");
                }
            })
        }
    });
    $(".fixedtool li").click(function() {
        flag = false;
        var index = $(this).index();
        $(".fixedtool .current").removeClass("current");
        $(this).addClass("current");
        var current = $(".floor>div").eq(index).offset().top;
        $("body,html").stop().animate({
            scrollTop: current
        }, function() {
            //动画执行完之后再把锁打开
            flag = true;
        });
    });

    function scrollD() {
        if ($(document).scrollTop() >= recommendTop) {
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();
        }
    }
})