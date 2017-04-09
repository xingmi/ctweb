var Vue = require('vue');
var Header = require('../components/Header.vue');
var Footer = require('../components/Footer.vue')
var HomeHeader = require('../components/homeHeader.vue');
var Config = require('../config/globalMain');
var utility = require('../config/utility');
var Toast = require('../widget/toast');
var bus = require('../config/bus')
var productList = new Vue({
    el : '.index',
    data : {
        
    },
    components: {
      'top-header': Header,
      'bottom-footer' : Footer,
      'home-header'   : HomeHeader
    },
    created : function(){
      
    },
    watch : {
    },
    methods : {
     
      
    }

});
