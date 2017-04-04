<template>
  <div class="logo">
    <img src="/static/images/common/logo2.png">
    <span>{{city}}<i @click="changeCity()">[切换城市]</i></span>
  </div>
</template>

<script>
var bus = require('../config/bus')

module.exports = {
  props : [],
  data : function(){
    return {
      city : ''
    }
  },
  mounted : function(){
    this.city = JSON.parse(sessionStorage['mapData']).current.name
  },
  methods : {
    changeCity : function(){
      bus.$emit('hide-cityItem' )
    }
  }

}
</script>


<style scoped>
.logo{
  margin-top: 30px;
}
.logo img{
  float: left;
  margin-right: 30px;
}
.logo span{
  color: #8e8d8d;
  font-size: 18px;
  float: left;
  margin-top: 10px;
}
.logo span i {
  font-size: 12px;
  display: block;
  color: #3c74e3;
  margin-top: 4px;
}
.logo span i:hover{
  cursor: pointer;
}

</style>