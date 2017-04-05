var Vue = require('vue');
var Header  = require('../components/Header.vue');
var Footer = require('../components/Footer.vue')
var HomeHeader = require('../components/homeHeader.vue')
var StaticNav = require('../components/staticNav.vue')
// var Toast = require('../widget/toast');
new Vue({
    el : '.static_resource',
    components: {
      'top-header': Header,
      'bottom-footer' : Footer,
      'home-header' : HomeHeader,
      'static-nav' : StaticNav
    }
});