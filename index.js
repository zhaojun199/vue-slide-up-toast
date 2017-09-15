/**
 * Updated by gooyoung on 2017/7/12.
 */
var Toast = {};
var showToast = false;      // 存储toast显示状态

Toast.install = function (Vue, options) {
    var opt = {
        duration:'3000'
    };
    for(var property in options){
        opt[property] = options[property];
    }
    Vue.prototype.$toast = function(tips){
        if(showToast){
            // 如果toast还在，则不再执行
            return;
        }
        var toastTpl = Vue.extend({
            data: function(){
                return {
                    show: showToast
                }
            },
            template: '<transition name="toast"><div v-show="show" class="lx-toast lx-toast-center">' + tips + '</div></transition>'
        });
        var vm = new toastTpl()
        var tpl = vm.$mount().$el;

        document.body.appendChild(tpl);
        vm.show = showToast = true;

        setTimeout(function () {
            vm.show = showToast = false;
        }, opt.duration)
    };
}
module.exports = Toast;