<template>
    <div>
      <div class="home_header">
        <div class="container clearfix">
          <logo-module></logo-module>
          <ul class="home_header_nav">
            <li :class="{current: (currentindex == 1)}"><a href="/index.html">首&nbsp;&nbsp;页</a></li>
            <li :class="{current: (currentindex == 2)}"><a href="/productList.html">个人贷款</a></li>
            <li :class="{current: (currentindex == 3)}"><a href="/productList.html">企业贷款</a></li>
            <li :class="{current: (currentindex == 4)}"><a href="/productList.html">抵押贷款</a></li>
            <li :class="{current: (currentindex == 5)}"><a href="/productList.html">信用贷款</a></li>
            <li :class="{current: (currentindex == 6)}"><a href="/collaboration.html">合&nbsp;&nbsp;作</a></li>
          </ul>
          <div class="search_input" v-if="showsearchItem">
            <input type="" name="" v-model="keyword" placeholder="搜索一下, 快速找到">
            <i @click="searchKeyword()"></i>
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
    props : ['showsearch','currentindex'],
    components: {
      'logo-module' : Logo,
      'city-change' : CityChange,
    },
    data : function(){
      return {
        keyword : ''
      }
    },
    created : function(){
      console.log(this.currentindex)
    },
    computed : {
      showsearchItem :function(){
        return this.showsearch == 'true'
      }
    },
    methods : {
      searchKeyword : function(){
        params = {
          keyword : this.keyword
        }
        window.location.href = '/productList.html?searchParams=' + JSON.stringify(params)
      }
    }
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
  width: 82px;
  text-align: center;
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
  width: 180px;
  margin-top:35px;
  position:relative;
}
.home_header .search_input input{
  width: 155px;
  height: 100%;
  padding-left: 10px;
}
.home_header .search_input i{
  position: absolute;
  right: 2px;
  top: 2px;
  width: 17px;
  height: 17px;
  background:url('/static/images/common/search_icon.jpg') center center;
  cursor: pointer;
}
</style>

