var Vue = require('vue');
var Header  = require('../components/Header.vue');
var Footer = require('../components/Footer.vue')
var ApplyModule = require('../components/applyModule.vue')
var HomeHeader = require('../components/homeHeader.vue')
var Config = require('../config/globalMain');

new Vue({
    el : '.collaboration',
    data : {
      page : 1,
      size : 12,
      type : 2,
      newsList : {},
      bannerImage : []
    },
    components: {
      'top-header': Header,
      'bottom-footer' : Footer,
      'apply-module' : ApplyModule,
      'home-header' : HomeHeader
    },
    created : function(){
      this.getData()

      this.$http.get(Config.api + "banners?type=4")
        .then(function(res){
        if(res.body.code == 0){
          this.bannerImage = res.body.data
        }
      },function(){

      }).bind(this);
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