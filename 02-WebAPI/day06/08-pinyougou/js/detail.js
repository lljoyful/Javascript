window.addEventListener('load', function() {
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    var bigImg = big.querySelector('img');
    //鼠标经过preview_img显示
    preview_img.addEventListener('mouseover', function() {
        mask.style.display = 'block';
        big.style.display = 'block';
    })
    preview_img.addEventListener('mouseout', function() {
        mask.style.display = 'none';
        big.style.display = 'none';
    })
    preview_img.addEventListener('mousemove', function(e) {
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        //因为这个遮盖层是有定位的，所以，要写相对父元素的位置
        //又因为要让鼠标在遮盖层中心位置，所以，要让它向上向左走一半
        var ml = x - mask.offsetWidth / 2;
        var mt = y - mask.offsetHeight / 2;

        if (ml < 0) {
            ml = 0;
        } else if (ml > preview_img.offsetWidth - mask.offsetWidth) {
            ml = preview_img.offsetWidth - mask.offsetWidth;
        }
        if (mt < 0) {
            mt = 0;
        } else if (mt > preview_img.offsetHeight - mask.offsetHeight) {
            mt = preview_img.offsetHeight - mask.offsetHeight;
        }
        mask.style.left = ml + 'px';
        mask.style.top = mt + 'px';
        //大图片的最大移动距离
        var bigMax = bigImg.offsetWidth - big.offsetWidth;
        var bigX = ml * bigMax / (preview_img.offsetWidth - mask.offsetWidth);
        var bigY = mt * bigMax / (preview_img.offsetHeight - mask.offsetHeight);
        bigImg.style.left = -bigX + 'px';
        bigImg.style.top = -bigY + 'px';
    })
})