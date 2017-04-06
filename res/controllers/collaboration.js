var Vue = require('vue');
var Header  = require('../components/Header.vue');
var Footer = require('../components/Footer.vue')
var ApplyModule = require('../components/applyModule.vue')
var HomeHeader = require('../components/homeHeader.vue')
var Config = require('../config/globalMain');
var utility = require('../config/utility');
var Toast = require('../widget/toast');

new Vue({
    el : '.collaboration',
    data : {

    },
    components: {
      'top-header': Header,
      'bottom-footer' : Footer,
      'apply-module' : ApplyModule,
      'home-header' : HomeHeader
    },
    created : function(){
        
    },
    watch : {
       
    },
    methods : {
       
    },
    computed : {
        
    }

});