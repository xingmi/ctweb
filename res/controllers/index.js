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
      }
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

        }).bind(this)
    },
    watch : {

    },
    methods : {
     
      
    }

});
