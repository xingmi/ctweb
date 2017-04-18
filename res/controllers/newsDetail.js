var Vue = require('vue');
var Header  = require('../components/Header.vue');
var Footer = require('../components/Footer.vue')
var HomeHeader = require('../components/homeHeader.vue')
var StaticNav = require('../components/staticNav.vue')
var utility = require('../config/utility');
var Config = require('../config/globalMain');

require('../config/date');

new Vue({
    el : '.static_resource',
    components: {
      'top-header': Header,
      'bottom-footer' : Footer,
      'home-header' : HomeHeader,
      'static-nav' : StaticNav
    },
    data : {
      type : utility.getUrlParam('type'),
      id   : utility.getUrlParam('id'),
      title : '',
      newsDetail : {}
    },
    created : function(){
      this.getData()
    },
    methods : {
      getData : function(){
        this.title = this.type == 1 ? '金融视点' : '长天资讯',
        this.$http.get(Config.api + 'articles/' + this.id)
        .then(function(res){
            if(res.body.code == 0){   
              this.newsDetail = res.body.data
            }
        },function(){

        }).bind(this);
      }
    }
});