<template>
  <div :class="white == 'true' ? 'container apply_container white_style' : 'container apply_container'">
      <div :class="showamount == 'true' ? 'apply_model fullItem' : 'apply_model'">
          <div v-if="!applySuccess">
            <h3>{{title}}</h3>
            <div>
              <label v-if="showamount == 'true'">
                <span class="title">申请额度：</span>
                <span class="input_box"><input v-model="user.amount" placeholder="请输入金额"></span>
              </label>
              <label class="clearfix">
                <span class="title">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</span>
                <span class="input_box"><input v-model="user.name" placeholder="请输入姓名"></span>
              </label>
              <label class="clearfix">
                <span class="title">手&nbsp;&nbsp;机&nbsp;&nbsp;号：</span>
                <span class="input_box"><input v-model.number="user.phone" placeholder="请输入手机号码"></span>
              </label >
              <label class="image_code clearfix">
                <span class="title">图片验证：</span>
                <span class="input_box">
                  <input v-model="imageCodeValue" placeholder="图片验证码">
                </span>
                <img :src="imageCode" @click="resetImageCode">
              </label>
              <label class="send_code clearfix">
                <span :class="sendStatus" @click="sendCode" v-cloak >{{codeMsg}}</span>
                <span class="input_box"><input v-model.number="user.code" placeholder="请输入手机验证码"></span>
              </label>
              <p>请真实填写本人信息，授权并联系您</p>
              <button v-on:click="postData">{{button}}</button>
            </div>
          </div>
          <div v-else>
            <div class="apply_success"></div>
            <div class="btns">
                <a href="/index.html">回到首页</a>
                <a href="">了解更多</a>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
var Config = require('../config/globalMain');
var Toast = require('../widget/toast');
var utility = require('../config/utility');

  module.exports = {
    props : ['title','showamount','button','white'],
    data : function(){
        return {
          isSend : true,
          codeMsg : "发送验证码",
          countdown : 60,
          imageCode : "",
          imageCodeValue : "",
          sendStatus : "title",
          user : {
              name : "",
              phone : "",
              code : '',
              amount : ""
          },
          applySuccess : false
        }
    },
    created : function(){
      this.imageCode = "http://api.toudaiworld.com/message/validate.jpg?openid=" + Config.openId
    },
    methods : {
        postData : function(){
            if(!this.user.code){
                Toast.show('请填写手机验证码',1000);
                return;
            }
            var self = this;
            var params = {
                'openid' : Config.openId,
                'mobile' : self.user.phone,
                'code'   : self.user.code,
                'name'   : self.user.name,
                'amount' : self.user.amount || 10000
            }

            if(window.location.href.indexOf('productDetail') > 0){
              _.extend(params,{
                pid : utility.getUrlParam('id')
              })
            }else if(window.location.href.indexOf('collaboration') > 0){
              _.extend(params,{
                type : 2
              })
            }

            self.$http.post(Config.api+ 'quick/personal',params).then(function(res){
                    if(res.body.code == 0){
                        this.applySuccess = true
                    }else{
                        Toast.show(res.body.message)  
                    }
                },function(res){
                    Toast.show('提交失败');
                });
        },
        resetImageCode : function(){
            this.imageCode = "http://api.toudaiworld.com/message/validate.jpg?openid="+Config.openId+"&data=" + new Date().getTime()
        },
        sendCode : function(){
            if((this.showamount == 'true')&&!this.user.amount){
                Toast.show('请填写金额',1000);
                return;
            }
            if(!this.user.name){
                Toast.show('请填写姓名',1000);
                return;
            }
            if(!this.user.phone){
                Toast.show('请填写手机号码',1000);
                return;
            }
            if(!this.imageCodeValue){
                Toast.show('请填写图片验证码',1000);
                return;
            }

            var self = this;
            function settime() {
                if (self.countdown == 0) {    
                    self.codeMsg = "发送验证码";
                    self.countdown = 60;
                    self.isSend = true; 
                    return;
                } else {
                    self.sendStatus = "title disable"
                    self.codeMsg = "重发(" + self.countdown + "s)";
                    self.countdown--;
                } 
                setTimeout(function() { settime() },1000) //每1000毫秒执行一次
            } 

            if(!self.isSend){
                return true;
            }

            this.$http.post(Config.api + 'message/sms',{
                openid : Config.openId,
                mobile : self.user.phone,
                code   : self.imageCodeValue
            },{
                before : function(){
                    self.isSend = false;
                }
            }).then(function(res){
                if(res.body.code == 0){
                    settime();
                    Toast.show('验证码正飞往您的手机')
                }else{
                    self.isSend = true; 
                    Toast.show(res.body.message);
                }
            },function(){
                self.isSend = true; 
                Toast.show('发送失败');
                
            })

        }
    }
  }
</script>