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
      page : 1,
      size : 12,
      type : utility.getUrlParam('type'),
      title : '',
      newsList : {}
    },
    created : function(){
      this.title = this.type == 1 ? '金融视点' : '长天资讯';
      this.getData()
    },
    methods : {
      getData : function(){
        this.$http.get(Config.api + 'articles',{
          params : {
            type : this.type,
            size : this.size,
            page : this.page
          }
        })
        .then(function(res){
            if(res.body.code == 0){   
              this.newsList = res.body.data
            }
        },function(){

        }).bind(this);
      },
      nextPage : function(){
        if(this.page < this.newsList.totalPage){
          this.page++;
          this.getData()
        }
      },
      prevPage : function(){
        if(this.page > 1){
          this.page--;
          this.getData()
        }
      }
    }
});