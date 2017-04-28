var Vue = require('vue');
var Header  = require('../components/Header.vue');
var Footer = require('../components/Footer.vue')
var HomeHeader = require('../components/homeHeader.vue')
var StaticNav = require('../components/staticNav.vue')
var Config = require('../config/globalMain');
// var Toast = require('../widget/toast');
new Vue({
    el : '.static_resource',
    components: {
      'top-header': Header,
      'bottom-footer' : Footer,
      'home-header' : HomeHeader,
      'static-nav' : StaticNav
    },
    data : {
      imageCode : "",
      imageCodeValue : ""
    },
    created : function(){
      this.imageCode = "http://api.toudaiworld.com/message/validate.jpg?openid=" + Config.openId
    },
    methods : {
      resetImageCode : function(){
          this.imageCode = "http://api.toudaiworld.com/message/validate.jpg?openid="+Config.openId+"&data=" + new Date().getTime()
      },
    }
});