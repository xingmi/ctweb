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


Vue.directive('change-video-state',{
    bind : function(el){
        el.addEventListener('click', function(){
            var status = $(this).find('span').css('display')
            if(status == 'block'){
                $(this).find('span').css('display','none')
                $(this).find('video')[0].play()
            }else{
                $(this).find('span').css('display','block')
                $(this).find('video')[0].pause()
            }

        })
    }
})