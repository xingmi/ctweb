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
      user : {
        code : "",
        openid : Config.openId
      },
      imageCode : ""
    },
    created : function(){
      this.imageCode = "http://api.toudaiworld.com/message/validate.jpg?openid=" + Config.openId
    },
    methods : {
      resetImageCode : function(){
          this.imageCode = "http://api.toudaiworld.com/message/validate.jpg?openid="+Config.openId+"&data=" + new Date().getTime()
      },
      postOpinion : function(){
        
        if(!this.user.title){
            alert('请填写主题内容');
            return;
        }
        if(!this.user.content){
            alert('请填写反馈内容');
            return;
        }
        if(!this.user.contact){
            alert('请填写联系人');
            return;
        }

        if(!this.user.mobile){
            alert('请填写手机');
            return;
        }

        if(!this.user.code){
            alert('请填写验证码');
            return;
        }


        this.$http.post(Config.api + "feedback/submit",this.user)
          .then(function(res){
          if(res.body.code == 0){
            alert('提交成功');
          }else{
            alert('验证码错误')
          }
        },function(){
          alert('验证码错误')
        }).bind(this);
      }
    }
});