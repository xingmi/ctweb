<template>
    <div class="home_header">
      <div class="container clearfix">
        <img src="../../static/images/common/logo2.png" class="logo">
        <ul class="home_header_nav">
          <li class="current"><a href="" class="current">首&nbsp;&nbsp;页</a></li>
          <li class=""><a href="">个人贷款</a></li>
          <li class=""><a href="">企业贷款</a></li>
          <li class="current"><a href="" >抵押贷款</a></li>
          <li class=""><a href="">信用贷款</a></li>
          <li class=""><a href="">加&nbsp;&nbsp;盟</a></li>
        </ul>
        <div class="search_input">
          <input type="" name="">
          <i></i>
        </div>
      </div>
    </div>
</template>


<style scoped>
.home_header{
  background: #FFF;
  height: 94px;
}
.home_header .container{
  height: 100%;
}
.home_header .logo{
  margin-top: 14px;
  margin-left: 5px;
  width:239px;
  height:64px;
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
.home_header .home_header_nav li.current{
  background: #539fee;
  color: #FFF;
}
.home_header .search_input{
  vertical-align: top;
  border: 1px solid #939393;
  display: inline-block;
  height: 24px;
  width: 250px;
  margin-top:35px;
}
.home_header .search_input input{
  width: 200px;
  height: 100%;
  padding-left: 10px;
}

</style>

