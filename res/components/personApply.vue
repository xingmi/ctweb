<template>
  <div class="dialog" v-show="showdialog">
    <div class="dialog_container">
      <div class="dialog_content" id="dialogModule">
          <i class="close_dialog" @click="closeDialog()"></i>
          <div class="apply_form" id="dialogContent">
            <h2>个人贷款在线申请</h2>
            <div class="clearfix apply" >
                <dl>
                    <dt>1. 称呼<i>*</i></dt>
                    <dd class="clearfix">
                        <p class="demo">例：X先生 / X女士</p>
                        <input type="text" v-model="params.name" />
                    </dd>
                    <dt>2. 预融资额度（万元为单位）<i>*</i></dt>
                    <dd class="clearfix">
                        <input type="number" v-model="params.amount" />
                    </dd>
                    <dt>3. 贷款用途<i>*</i></dt>
                    <dd class="clearfix">
                        <label class="db" v-for="usage in configParams.usage">
                            <input type="radio" name="usage" :value="usage.value" v-model="params.usage"/>
                            <i></i>
                            {{usage.text}}
                        </label>
                    </dd>
                    <dt>4. 固定资产情况（可多选）<i>*</i></dt>
                    <dd class="clearfix">
                        <label class="w25" v-for="fixed_assets in configParams.fixed_assets">
                            <input type="checkbox" name="fixed_assets" :value="fixed_assets.value" v-model="params.assets"/>
                            <i></i>
                            {{fixed_assets.text}}
                        </label>
                    </dd>
                    <dt>5. 身份<i>*</i></dt>
                    <dd class="clearfix"> 
                        <label class="db" v-for="identity in configParams.identity">
                            <input type="radio" name="identity" :value="identity.value" v-model="params.identity"/>
                            <i></i>
                            {{identity.text}}
                        </label>
                    </dd>
                    <dt>6. 具体情况<i>*</i></dt>
                    <dd class="clearfix">
                        <div class="yesorno_model">
                            <h3>是否有打卡工资</h3>
                            <div v-for="yesorno in configParams.yesorno">
                                <label>
                                <input type="radio" name="yesorno1" :value="yesorno.value" v-model="params.salary">
                                <i></i>
                                {{yesorno.text}}
                                </label>
                            </div>
                        </div>

                        <div class="yesorno_model">
                            <h3>是否缴纳社保</h3>
                            <div v-for="yesorno in configParams.yesorno">
                                <label>
                                <input type="radio" name="yesorno2" :value="yesorno.value" v-model="params.social">
                                <i></i>
                                {{yesorno.text}}
                                </label>
                            </div>
                        </div>

                        <div class="yesorno_model">
                            <h3>是否缴公积金</h3>
                            <div v-for="yesorno in configParams.yesorno">
                                <label>
                                <input type="radio" name="yesorno3" :value="yesorno.value" v-model="params.accu">
                                <i></i>
                                {{yesorno.text}}
                                </label>
                            </div>
                        </div>
                    </dd>
                    <dt>7. 月收入(元为单位）<i>*</i></dt>
                    <dd class="clearfix">
                        <input type="text" v-model="params.monthly" />
                    </dd>
                    <dt>8. 征信情况 <i>*</i></dt>
                    <dd class="clearfix">
                        <select class="select_option" v-model="temCredit_registries">
                            <option value="">请选择</option>
                            <option v-for="option in configParams.credit_registries" :value="option.value">{{ option.text }}</option>
                        </select>
                        <div class="analog_input">{{params.credit | creditRegistriesValue}}</div>
                    </dd>
                    <dt>9. 期望融资办理时间<i>*</i></dt>
                    <dd class="clearfix">
                        <select class="select_option" v-model="temExpected">
                            <option value="">请选择</option>
                            <option v-for="option in configParams.expected" :value="option.value">{{ option.text }}</option>
                        </select>
                        <div class="analog_input">{{params.expected | expectedValue}}</div>
                    </dd>
                    <dt>10. 联系方式<i>*</i></dt>
                    <dd class="clearfix">
                         <input type="number" placeholder="请输入手机号码" v-model="params.mobile" />
                    </dd>
                </dl>
            </div>
            <span class="apply_btn" @click="applyBtn()">高效申请</span>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
var Config = require('../config/globalMain');
var bus = require('../config/bus')
module.exports = {
  data : function(){
    return {
        params : {
            name : '',
            amount : '',
            usage : '',
            assets : [],
            identity : '',
            salary : '',
            social : '',
            accu : '',
            monthly : '',
            credit : '',
            expected : '',
            mobile : ''
        },
        configParams : {} ,
        temCredit_registries : [],
        temExpected : [],
        showdialog : false
    }
  },
  watch : {
      temCredit_registries : function(value){
          this.params.credit = value;
      },
      temExpected : function(value){
          this.params.expected = value;
      }
  },
  created : function(){
    var that = this;
    bus.$on('showdialogPerson',function(){
      that.resetShowDialog()
    })
  },
  computed : {
  },
  mounted : function(){    
    this.configParams = JSON.parse(sessionStorage['mapData']);
    var wh = window.innerHeight;
    document.getElementById('dialogModule').style.height = wh - 100 +'px'
    document.getElementById('dialogContent').style.height = wh - 105 +'px'
  },
  methods : {
      resetShowDialog : function(){
        this.showdialog = !this.showdialog 
      },
      applyBtn : function(){
          var postData = JSON.parse(JSON.stringify(this.params));
          postData.assets = eval(this.params.assets.join('+'));
          postData.openid = 'test';
          for(key in postData){

              if(!postData[key] || postData[key]  == undefined ){
                  alert('请检查所有数据是否填写完整');
                  return false;
              };
          }

          this.$http.post(Config.api+ 'loan/personal',postData).then(function(res){
              if(res.body.code == 0){
                  alert('提交成功')
                  window.location.reload();
              }else{
                  alert(res.body.message)
              }
          },function(){

          })
      },
      closeDialog : function(){
        this.resetShowDialog()
      }
  }
}  

</script>

<style scoped>
.dialog{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.5)
}
.dialog .dialog_container{
  position: fixed;
  width: 500px;
  left: 50%;
}
.dialog .dialog_container .dialog_content{
  position: absolute;
  width: 100%;
  background: #FFF;
  left: -50%;
  top: 50px;
  border: 2px solid #aaaaaa;
  height: 500px;
  border-radius: 4px;

}
.dialog .dialog_container .dialog_content .close_dialog{
  position: absolute;
  width: 32px;
  height: 32px;
  right: -16px;
  top: -16px;
  z-index: 2;
  background: url('/static/images/common/dialog_close.png') no-repeat;
}
.dialog .dialog_container .dialog_content .close_dialog:hover{
  cursor: pointer;
}

.apply_form {
    overflow: scroll;
    padding-bottom: 60px;
    padding: 0 10px 20px 10px;
}
.apply_form h2{
    font-size: 16px;
    padding: 10px;
    border-bottom: 1px solid #aeadad;
    color: #3877ca;

}
.apply_form .apply_btn{
    display: block;
    margin: 20px auto 0 auto;
    width: 320px;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    text-align: center;
    background: #3877ca;
    color: #FFF;
    letter-spacing: 10px;
}
.apply_form .apply_btn:hover{
  cursor: pointer;
}
.apply_form .apply{
    padding: 0 10px;
}
.apply_form .apply dt{
    color: #6191a6;
    font-size: 14px;
    margin: 15px 0 5px 0;
}
.apply_form .apply i{
    color: #f5ac7f;
    margin-left: 5px;
}
.apply_form .apply dd{
    overflow: hidden;
    position: relative;
}
.apply_form .apply dd .demo{
    font-size: 11px;
    margin: 5px 0 10px 0;
    line-height: 14px;
}
.apply_form .apply dd label{
    display: block;
}
.apply_form .apply dd label.db{
    display: block;
    margin: 10px 0;
}
.apply_form .apply dd label.w25{
    float: left;
    width: 25%;
}
.apply_form .apply dd input[type=text],
.apply_form .apply dd input[type=number],
.apply_form .apply dd .analog_input{
    border: 1px solid #f7bd99;
    width: 100%;
    height: 30px;
    line-height: 30px;
    margin: 4px 0;
    box-shadow: 1px 1px 5px #f7bd99,1px 1px 5px #f7bd99 inset;
    padding-left: 10px;
    position: relative;
}

.apply_form .apply dd .analog_input::after{
    position: absolute;
    right: 10px;
    top: 9px;
    content: "";
    width: 0;
    height: 0;
    border-top: 8px solid #333333;
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;
}
.apply_form .apply dd label{
  position: relative;
}
.apply_form .apply dd input[type=radio]{
  margin-left: 5px;
  width: 12px;
  height: 12px;
/*    position: absolute;
    width: 12px;
    height: 12px;
    top: 4px;
    left: 5px;*/
    /*display: none;*/
}
.apply_form .apply dd input[type=radio] + i{
    /*background: url('../images/apply_radio_image.png') no-repeat;*/
/*    background-size: 34px 17px;
    width: 17px;
    height: 17px;
    display: inline-block;
    vertical-align: -4px;*/
}
.apply_form .apply dd input[type=radio]:checked + i{
    background-position: right top;
}

.apply_form .apply dd input[type=checkbox]{
    margin-left: 5px;
/*    position: absolute;*/
/*    display: none;*/
}

.apply_form .apply dd input[type=checkbox] + i{
   /* background: url('../images/apply_checkbox.png') no-repeat;*/
/*    background-size: 34px 17px;
    width: 17px;
    height: 17px;
    display: inline-block;
    vertical-align: -4px;*/
}
.apply_form .apply dd input[type=checkbox]:checked + i{
    background-position: right top;
}


.apply_form .apply dd .yesorno_model{
    margin-top: 10px;
}
.apply_form .apply dd .yesorno_model h3{
    color: #FFF;
    background: #ee775f;
    height: 30px;
    line-height: 30px;
    padding-left: 3px;
}
.apply_form .apply dd .yesorno_model div{
    line-height: 30px;
    border:1px solid #ee775f;
    padding-left: 5px;
}
.apply_form .apply dd .yesorno_model div:last-child{
    border-top: 0;
}

.apply_form .select_option{
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    height: 30px;
    opacity: 0;
}

.apply_form .table_model {
    border-top: 1px solid #f6b58d;
    border-left: 1px solid #f6b58d;
    color: #6191a6;
}
.apply_form .table_model ul li{
    width: 25%;
    float: left;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-bottom: 1px solid #f6b58d;
    border-right: 1px solid #f6b58d;
}
.apply_form .table_model ul.row_title{
    background: #f7bd99;
    color: #FFF;
}
</style>