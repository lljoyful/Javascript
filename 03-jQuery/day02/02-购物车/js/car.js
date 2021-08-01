$(function() {
    //1.全选 全部选功能
    //全选按钮checkall  小按钮j-checkbox  事件可以用change
    $(".checkall").change(function() {
        $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));
        if ($(this).prop("checked")) {
            //背景颜色
            $(".cart-item").addClass("check-cart-item");
        } else {
            $(".cart-item").removeClass("check-cart-item");
        }
    });
    // console.log($(".j-checkbox"));
    $(".j-checkbox").change(function() {
        // console.log($(".j-checkbox:checked"));所有的个数
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
        //背景
        if ($(this).prop("checked")) {
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }

    });

    //2. 增减商品数量
    $('.increment').click(function() {
        var n = $(this).siblings(".itxt").val();
        n++;
        $(this).siblings(".itxt").val(n);
        // 修改小计p-sum 
        var price = $(this).parents(".p-num").siblings(".p-price").text();
        var sum = $(this).parents(".p-num").siblings(".p-sum").text();
        price = price.substr(1);
        sum = price * n;
        sum = sum.toFixed(2);
        var sum = $(this).parents(".p-num").siblings(".p-sum").text("￥" + sum)
        getSum();
    });
    $('.decrement').click(function() {
        var n = $(this).siblings(".itxt").val();
        n--;
        if (n === 0) {
            return false;
        }
        $(this).siblings(".itxt").val(n);
        // 修改小计p-sum 
        var price = $(this).parents(".p-num").siblings(".p-price").text();
        var sum = $(this).parents(".p-num").siblings(".p-sum").text();
        price = price.substr(1);
        sum = price * n;
        sum = sum.toFixed(2);
        var sum = $(this).parents(".p-num").siblings(".p-sum").text("￥" + sum);
        getSum();
    });
    //3. 用户修改文本框的值 计算 小计模块
    $(".itxt").change(function() {
        //得到当前的值
        var n = $(this).val();
        // 修改小计p-sum 
        var price = $(this).parents(".p-num").siblings(".p-price").text();
        var sum = $(this).parents(".p-num").siblings(".p-sum").text();
        price = price.substr(1);
        sum = price * n;
        sum = sum.toFixed(2);
        var sum = $(this).parents(".p-num").siblings(".p-sum").text("￥" + sum);
        getSum();
    });
    //4.总计和zonge
    function getSum() {
        var count = 0; //件数
        var money = 0; //总价
        $.each($(".itxt"), function(index, ele) {
            count += parseInt($(ele).val());
            // count += parseInt($(this).val());
            var price = $(this).parents(".p-num").siblings(".p-sum").text()
            price = parseFloat(price.substr(1));
            money += price;
        });
        money = money.toFixed(2);
        $(".amount-sum>em").text(count);
        $(".price-sum>em").text("￥" + money);
    }
    getSum();
    //5.删除商品
    //删除单个商品
    $(".p-action").click(function() {
        $(this).parents(".cart-item").remove();
        getSum();
    });
    //删除选中的商品
    $(".remove-batch").click(function() {
        // $(".j-checkbox:checked").parents(".cart-item").remove();
        $(".j-checkbox").each(function(index, ele) {
            // console.log(ele);
            //ele是dom元素
            if (ele.checked) {
                $(ele).parents(".cart-item").remove();
                getSum();
            }
        });
    });
    //清空所有元素
    $(".clear-all").click(function() {
        $(".cart-item").remove();
        getSum();
    });

})