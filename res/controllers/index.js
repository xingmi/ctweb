var Vue = require('vue');
var Header = require('../components/Header.vue');
var Footer = require('../components/Footer.vue')
var HomeHeader = require('../components/homeHeader.vue');
var ApplyModule = require('../components/applyModule.vue')
var Config = require('../config/globalMain');
var utility = require('../config/utility');
var Toast = require('../widget/toast');

var productList = new Vue({
    el : '.index',
    data : {
      homeDetail : {
      },
      bannerImage : []
    },
    components: {
      'top-header': Header,
      'bottom-footer' : Footer,
      'home-header'   : HomeHeader,
      'apply-module' : ApplyModule
    },
    created : function(){
      this.$http.get(Config.api + "home")
        .then(function(res){
          if(res.body.code == 0){
            this.homeDetail = res.body.data
          }
        },function(){

        }).bind(this);

      this.$http.get(Config.api + "banners?type=1")
        .then(function(res){
        if(res.body.code == 0){
          this.bannerImage = res.body.data
        }
      },function(){

      }).bind(this);
    },
    mounted : function(){

      window.onload = function(){
        var unslider04 = $('.swiper').unslider({
            dots: true
        }),
        data04 = unslider04.data('unslider');
         
        $('.unslider-arrow04').click(function() {
            var fn = this.className.split(' ')[1];
            data04[fn]();
        });
      }

    },
    watch : {

    },
    methods : {
     
      
    }

});
