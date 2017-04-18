<template>
  <div class="dialog" v-show="showdialog">
    <div class="dialog_container">
      <div class="dialog_content" id="dialogModule2">
          <i class="close_dialog" @click="closeDialog()"></i>
          <div class="apply_form" id="dialogContent2">
            <h2>企业贷款在线申请</h2>
            <div class="clearfix apply" >
                <dl>
                    <dt>1. 称呼<i>*</i></dt>
                    <dd class="clearfix">
                        <p class="demo">例：X先生 / X女士</p>
                        <input type="text" v-model="params.name" />
                    </dd>

                    <dt>2. 所属行业<i>*</i></dt>
                    <dd class="clearfix">
                        <select class="select_option" v-model="temTrade">
                            <option value="">请选择</option>
                            <option v-for="option in configParams.trade" :value="option.value">{{ option.text }}</option>
                        </select>
                        <div class="analog_input">{{params.trade | tradeValue}}</div>
                    </dd>
                    <dt>3. 预融资额度（万元为单位）<i>*</i></dt>
                    <dd class="clearfix">
                        <input type="number" v-model="params.quota" />
                    </dd>
                    <dt>4. 企业年开票额<i>*</i></dt>
                    <dd class="clearfix">
                        <label class="db" v-for="invoice in configParams.invoice">
                            <input type="radio" name="invoice" :value="invoice.value" v-model="params.invoice"/>
                            <i></i>
                            {{invoice.text}}
                        </label>
                    </dd>
                    <dt>5. 企业及个人名下负债<i>*</i></dt>
                    <dd class="clearfix">
                        <label class="db" v-for="liabilities in configParams.liabilities">
                            <input type="radio" name="liabilities" :value="liabilities.value" v-model="params.liabilities"/>
                            <i></i>
                            {{liabilities.text}}
                        </label>
                    </dd>
                    <dt>6. 固定资产情况<i>*</i></dt>
                    <dd class="clearfix">
                        <div class="table_model">
                            <ul class="clearfix row_title">
                                <li></li>
                                <li>全款</li>
                                <li>按揭/租赁</li>
                                <li>无此类资产</li>
                            </ul>
                            <ul class="clearfix">
                                <li>个人房产</li>
                                <li v-for="assets_options in configParams.assets_options" class="clearfix">
                                    <label class="db" >
                                        <input type="radio" name="house" :value="assets_options.value" v-model="params.house"/>
                                        <i></i>
                                    </label>
                                </li>
                            </ul>
                            <ul class="clearfix">
                                <li>汽车</li>
                                <li v-for="assets_options in configParams.assets_options" class="clearfix">
                                    <label class="db" >
                                        <input type="radio" name="car" :value="assets_options.value" v-model="params.car"/>
                                        <i></i>
                                    </label>
                                </li>
                            </ul>
                            <ul class="clearfix">
                                <li>设备</li>
                                <li v-for="assets_options in configParams.assets_options" class="clearfix">
                                    <label class="db" >
                                        <input type="radio" name="device" :value="assets_options.value" v-model="params.device"/>
                                        <i></i>
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </dd>
                    <dt>7. 企业应收账款额<i>*</i></dt>
                    <dd class="clearfix">
                        <p class="demo">付款方须是大型企业，如：央企、国企、上市公司、政府平台</p>
                        <label class="db" v-for="receivables in configParams.receivables">
                            <input type="radio" name="receivables" :value="receivables.value" v-model="params.receivables"/>
                            <i></i>
                            {{receivables.text}}
                        </label>
                    </dd>
                    <dt>8. 征信情况 <i>*</i></dt>
                    <dd class="clearfix">
                        <select class="select_option" v-model="temCredit_registries">
                            <option value="">请选择</option>
                            <option v-for="option in configParams.credit_registries" :value="option.value">{{ option.text }}</option>
                        </select>
                        <div class="analog_input">{{params.credit | creditRegistriesValue}}</div>
                    </dd>
                    <dt>9. 联系方式<i>*</i></dt>
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
        showdialog : false,
        temTrade : []
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
    bus.$on('showdialogCompany',function(){
      that.resetShowDialog()
    })
  },
  computed : {
  },
  mounted : function(){    
    this.configParams = JSON.parse(sessionStorage['mapData']);
    var wh = window.innerHeight;
    document.getElementById('dialogModule2').style.height = wh - 100 +'px'
    document.getElementById('dialogContent2').style.height = wh - 105 +'px'
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

          this.$http.post(Config.api+ 'loan/enterprise',postData).then(function(res){
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
  width: 700px;
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
    width: 520px;
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
  /*  margin: 10px 0;*/
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
.apply_form .table_model ul.row_title li{
    background: #ee775f;
    color: #FFF;
}
</style>