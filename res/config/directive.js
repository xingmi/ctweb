var Vue  = require('vue');
var $ = require('../lib/zepto');

Vue.directive('change-join-state',{
    bind : function(el){
        el.addEventListener('click', function(){
            if($(this).hasClass('current')){
                $(this).removeClass('current')
                $(this).closest('li').find('div').css({
                    'display' : 'block'
                })
            }else{
                $(this).addClass('current')
                $(this).closest('li').find('div').css({
                    'display' : 'none'
                })
            }

        })
    }
})