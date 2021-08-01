var that;
class Tab {
    constructor(id) {
        that = this;
        this.main = document.querySelector(id);
        this.add = this.main.querySelector(".tabadd");
        this.ul = this.main.querySelector(".fisrstnav ul:first-child");
        this.fsection = this.main.querySelector('.tabscon');
        this.init();
    };
    init() {
        this.updateNode();
        //初始化，让相关的元素绑定事件
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.remove[i].onclick = this.removeTab;
            this.spans[i].ondblclick = this.editTab;
            this.section[i].ondblclick = this.editTab;
        }
        this.add.onclick = this.addTab;
    };
    //我们动态添加元素需要从新获取对应的元素 
    updateNode() {
        this.lis = this.main.querySelectorAll('li');
        this.section = this.main.querySelectorAll('section');
        this.remove = this.main.querySelectorAll(".icon-guanbi");
        this.spans = this.main.querySelectorAll(".fisrstnav li span:first-child");
    };
    //1.切换功能
    toggleTab() {
        that.clearClass();
        this.className = 'liactive';
        that.section[this.index].className = 'conactive';
    };
    //清除所有li 和session类
    clearClass() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = "";
            this.section[i].className = "";
        }
    };
    //2.添加功能
    addTab() {
        that.clearClass();
        var mode = Math.random();
        //创建li元素和section元素
        var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
        var section = '<section class="conactive">新建：' + mode + '</section>';
        //insertAdjacentHtml追加字符串
        that.ul.insertAdjacentHTML('beforeend', li);
        that.fsection.insertAdjacentHTML('beforeend', section);
        that.init();
    };
    //3.删除
    removeTab(e) {
        e.stopPropagation(); //阻止冒泡，防止触发li的点击切换
        var index = this.parentNode.index;
        that.lis[index].remove();
        that.section[index].remove();
        that.init();
        //当我们删除的不是选定状态的李，原状态不变
        if (document.querySelector('.liactive')) return;
        //当我们删除了选定状态的li，让前一个处于选定状态
        if (index !== 0) {
            index--;
        }
        //先判断that.lis[index] ，有就执行后边，没有就不执行
        that.lis[index] && that.lis[index].click();
    };
    //4.修改
    editTab() {
        var str = this.innerHTML;
        //双击禁止选定文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        this.innerHTML = '<input type="text"/>';
        var input = this.children[0];
        input.value = str;
        input.select(); //文本框里面的文字处于选定状态
        //当我们离开文本框就把文本框里面的值给span
        input.onblur = function() {
            //这里的this是input了
            this.parentNode.innerHTML = this.value;
        };
        input.onkeyup = function(e) {
            if (e.keyCode === 13) {
                //手动调用表单失去事件
                this.blur();
            }
        }
    };
}
var tab = new Tab("#tab");