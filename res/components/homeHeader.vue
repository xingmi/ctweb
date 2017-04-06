<template>
    <div>
      <div class="home_header">
        <div class="container clearfix">
          <logo-module></logo-module>
          <ul class="home_header_nav">
            <li class=""><a href="/index.html" class="">首&nbsp;&nbsp;页</a></li>
            <li class=""><a href="/productList.html">个人贷款</a></li>
            <li class=""><a href="/productList.html">企业贷款</a></li>
            <li class=""><a href="/productList.html">抵押贷款</a></li>
            <li class=""><a href="/productList.html">信用贷款</a></li>
            <li class=""><a href="/collaboration.html">加&nbsp;&nbsp;盟</a></li>
          </ul>
          <div class="search_input">
            <input type="" name="">
            <i></i>
          </div>
        </div>
      </div>
      <city-change></city-change>
    </div>
</template>

<script>
var Logo   = require('./LogoModule.vue');
var CityChange = require('./citySelect.vue');
  module.exports = {
    components: {
      'logo-module' : Logo,
      'city-change' : CityChange,
    },
  }
</script>

<style scoped>
.home_header{
  background: #FFF;
  height: 94px;
}
.home_header .container{
  height: 100%;
}
.home_header .logo{
/*  margin-top: 14px;
  margin-left: 5px;
  width:239px;
  height:64px;*/
}
.home_header .home_header_nav{
  display: inline-block;
  margin-top: 30px;
  margin-left: 30px;
}
.home_header .home_header_nav li{
  float: left;
  padding:4px 5px;
  font-size: 16px;
  letter-spacing: 2px;
  margin: 0 15px;
  border-radius: 4px;
}
.home_header .home_header_nav li:hover,
.home_header .home_header_nav li.current{
  background: #539fee;
  color: #FFF;
}
.home_header .search_input{
  vertical-align: top;
  border: 1px solid #939393;
  display: inline-block;
  height: 24px;
  width: 220px;
  margin-top:35px;
}
.home_header .search_input input{
  width: 210px;
  height: 100%;
  padding-left: 10px;
}

</style>

