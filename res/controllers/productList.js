var Vue = require('vue');
var Header = require('../components/Header.vue');
var Footer = require('../components/Footer.vue')
var Logo   = require('../components/LogoModule.vue');
var CityChange = require('../components/citySelect.vue');
var PersonApply = require('../components/personApply.vue');
var CompanyApply = require('../components/companyApply.vue')
var Config = require('../config/globalMain');
var utility = require('../config/utility');
var Toast = require('../widget/toast');
var bus = require('../config/bus')
var productList = new Vue({
    el : '.product_list',
    data : {
        page : 1,
        size : 20,
        datas : '',
        temParams : {},
        productlist : [],
        active : false,
        productlistDetail : {},
        tmpSearchParams : {
          peoples : [],
          assets : [],
          credits : [],
          refunds : [],
          institutions : []
        },
        searchTmpParams : {
          keyword : "",
          amount  : ""
        }
    },
    components: {
      'top-header': Header,
      'bottom-footer' : Footer,
      'logo-module' : Logo,
      'city-change' : CityChange,
      'person-apply' : PersonApply,
      'company-apply' : CompanyApply
    },
    created : function(){
      var that = this;

      var searchParams = utility.getUrlParam('searchParams') && JSON.parse(utility.getUrlParam('searchParams')) || {};
      var temParams = _.extend(this.temParams,searchParams);

      _.each(searchParams,function(value,key){
          if(!!value) temParams[key] = value;
      })
      that.temParams = temParams;

      that.getData();

    },
    watch : {
    },
    methods : {
      getData : function(){
        var that = this;
        var temParams = {}
        that.temParams.page = this.page;
        that.temParams.size = this.size;

        _.each(that.temParams,function(value,key){
          if(!!value) temParams[key] = value;
        });

        that.$http.get(Config.api+ 'products.json',{
            params : temParams
        }).then(function(res){
            that.datas = JSON.parse(sessionStorage['mapData'])
            that.productlistDetail = res.body.data;
            that.productlist = _.concat(that.productlist,res.body.data.data);
            
        },function(res){

        });
      },
      deleteCondition : function(key){
        this.tmpSearchParams[key] = [];
        this.temParams[key] = '';
        this.getNewData()
      },
      deleteConditionAll : function(){
        var that = this;
        ['peoples','assets','credits','refunds','institutions'].forEach(function(key){
          that.tmpSearchParams[key] = [];
          that.temParams[key] = '';
        })
        this.getNewData()
      },
      showDialog : function(typename){
        if(typename == 'person'){
          bus.$emit('showdialogPerson')
        }else{
          bus.$emit('showdialogCompany')
        }
      },
      selectPeople : function(value){
        if(this.tmpSearchParams.peoples.length > 1){
            this.tmpSearchParams.peoples.shift();
        }
        this.temParams.peoples = this.tmpSearchParams.peoples[0];
        this.getNewData()
      },
      selectAssets : function(value){
        if(this.tmpSearchParams.assets.length > 1){
            this.tmpSearchParams.assets.shift();
        }
        this.temParams.assets = this.tmpSearchParams.assets[0];
        this.getNewData();
      },
      selectCredit : function(value){

        if(this.tmpSearchParams.credits.length > 1){
            this.tmpSearchParams.credits.shift();
        }
        this.temParams.credits = this.tmpSearchParams.credits[0];
        this.getNewData();
      },
      selectRefund : function(value){
        if(this.tmpSearchParams.refunds.length > 1){
            this.tmpSearchParams.refunds.shift();
        }
        this.temParams.refunds = this.tmpSearchParams.refunds[0];
        this.getNewData();
      },
      selectInstitution : function(value){
        if(this.tmpSearchParams.institutions.length > 1){
            this.tmpSearchParams.institutions.shift();
        }
        this.temParams.institutions = this.tmpSearchParams.institutions[0];
        this.getNewData();
      },
      selectKeyword : function(){
        this.temParams.keyword = this.searchTmpParams.keyword;
        this.searchTmpParams.amount = this.temParams.amount = ''
        this.getNewData();
      },
      selectAmount : function(){
        this.temParams.amount = this.searchTmpParams.amount;
        this.searchTmpParams.keyword = this.temParams.keyword = ''
        this.getNewData();
      },

      getNewData : function(){
        this.productlist = [];
        this.page = 1;
        this.getData();
      },
      nextPage : function(){
        if(this.page < this.productlistDetail.totalPage){
          this.page++;
          this.productlist = [];
          this.getData();
          window.scrollTo(0,0)
        }
      },
      prevPage : function(){
        if(this.page > 1){
          this.page--;
          this.productlist = [];
          this.getData();
          window.scrollTo(0,0)
        }
      }
    },
    events : {
    },
    computed : {
        
    }

});
