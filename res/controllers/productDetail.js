var Vue = require('vue');
var Header  = require('../components/Header.vue');
var Footer = require('../components/Footer.vue')
var ApplyModule = require('../components/applyModule.vue')
var Config = require('../config/globalMain');
var utility = require('../config/utility');
var Toast = require('../widget/toast');

new Vue({
    el : '.product',
    data : {
        show : false,
        productDetail : {
            favorite : false,
            requirements : '',
            materials : ''
        },
        interest : {},
        selectParams : {
            amount : '',
            term : ''
        },
        widthCalculateInterest : 0,
        widthCalculateFee : 0,
        term : []
    },
    components: {
      'top-header': Header,
      'bottom-footer' : Footer,
      'apply-module' : ApplyModule
    },
    created : function(){
        this.$http.get(Config.api + 'product/'+utility.getUrlParam('id')+'.json')
          .then(function(res){
            if(res.body.code == 0){   
                _.extend(this.productDetail,res.body.data);

                this.selectParams.amount = this.productDetail.minAmount;
                this.selectParams.term = this.productDetail.minTerm;

                this.getInterestsDetail()
            }
        },function(){

        }).bind(this);
    },
    watch : {
        term : function(value){
            this.selectParams.term = value;
            this.getInterestsDetail();
        }
    },
    methods : {
        changeAmount : function(){
            this.getInterestsDetail();
        },
        getInterestsDetail : function(){
            var that = this;
            // if(!this.selectParams.amount){
            //     alert('请输入金额');
            //     return;
            // }
            // if(this.selectParams.amount < this.productDetail.minAmount || this.selectParams.amount > this.productDetail.maxAmount){
            //     alert('请输入正确的金额');
            //     return;
            // }

            this.$http.post(Config.api + 'product/'+utility.getUrlParam('id')+'/interests.json',{
                id : utility.getUrlParam('id'),
                amount : this.selectParams.amount,
                term : this.selectParams.term
            }).then(function(res){
                if(res.body.code == 0){
                    that.interest = res.body.data
                }
            },function(){

            })
        }
    },
    computed : {
        parserRequirements : function(){
            if(this.productDetail.requirements){
                return this.productDetail.requirements.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
            }
        },
        parserMaterials : function(){
            if(this.productDetail.materials){
                return this.productDetail.materials.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
            }
        },
        widthCalculateInterest : function(){
            if(this.interest.interest){
                return Math.round((this.interest.interest/(this.selectParams.amount*10000))*100)
            }else{
                return 0;
            }
        },
        widthCalculateFee : function(){
            if(this.interest.fee){
                return Math.round((this.interest.fee/(this.selectParams.amount*10000))*100)
            }else{
                return 0;
            }
            
        }
    }

});