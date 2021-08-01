$(function() {
    load();
    $("#title").on("keydown", function(event) {
        if (event.keyCode === 13 && $(this).val() !== "") {
            //先读取本地存储原来的数据
            var local = getDate();
            // console.log(local);
            //把local数组进行更新数据把最新的数据追加给local数组
            local.push({
                title: $(this).val(),
                done: false
            });
            saveDate(local);
            //本地存储的数据渲染到页面
            load();
            //input的值清除
            $("#title").val("");
        }
    });
    //移动
    $("ol,ul").on("change", "input", function() {
        var i = $(this).siblings("a").attr("id");
        // console.log(i);
        //获取本地存储
        var data = getDate();
        if ($(this).prop("checked")) {
            // console.log(1);
            data[i].done = true;
        } else {
            // console.log(0);
            data[i].done = false;
        }
        // 存储数据
        saveDate(data);
        getDate();
        load();
    });
    //todolist删除操作
    $("ol,ul").on("click", "a", function() {
        //获取本地存储
        var data = getDate();
        //修改数据
        // console.log($(this).attr("id"));获取索引号
        data.splice($(this).attr("id"), 1);
        saveDate(data);
        load();
    });
    //读取本地存储的数据
    function getDate() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }
    //保存本地存储数据
    function saveDate(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }
    //渲染加载数据
    function load() {
        var data = getDate();
        //遍历之前清空ol和ul里的元素
        $(".demo-box").empty();
        $("#donelist").empty();
        var todoCount = 0; //正在进行的个数
        var doneCount = 0; //已经完成的个数
        //遍历
        $.each(data, function(i, n) {
            if (n.done) {
                doneCount++;
                $("#donelist").prepend("<li><input type='checkbox' checked><p>" + n.title + "</p><a href='javascript:;' id=" + i + "></a></li>");

            } else {
                todoCount++;
                $(".demo-box").prepend("<li><input type='checkbox' ><p>" + n.title + "</p><a href='javascript:;' id=" + i + "></a></li>");

            }
        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }
})