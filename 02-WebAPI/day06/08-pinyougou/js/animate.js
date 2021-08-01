//目标对象 目标位置
function animate(obj, target, callback) {
    // console.log(callback);调用的时候callback()
    //解决多定时器问题,确保只有一个定时器执行
    clearInterval(obj.setTime);
    obj.setTime = setInterval(function() {
        //缓动动画
        //设置步长值,
        // var step = (target - obj.offsetLeft) / 10;
        //步长值应该取整，向上取整
        // var step = Math.ceil((target - obj.offsetLeft) / 10);
        //考虑到后退的的功能，应该往走远的方向取
        var temp = target - obj.offsetLeft;
        if (temp >= 0) {
            var step = Math.ceil(temp / 10);
        } else {
            var step = Math.floor(temp / 10);
        }
        obj.style.left = obj.offsetLeft + step + 'px';
        //停止动画
        if (obj.offsetLeft == target) {
            clearInterval(obj.setTime);
            //回调函数写在定时器结束后
            if (callback) {
                //调用函数
                callback();
            }
            //等价于以下写法
            // callback && callback();
        }
    }, 15);
}