<template>
    <div class="header ">
      <div class="container clearfix">
        <img src="../../static/images/common/logo.png" v-if= "hidelogo == false">
        <ul class="header_nav">
          <li class="down_load_app">下载APP</li>
          <li class="tel">客服电话：4008-525-987</li>
        </ul>
      </div>
    </div>
</template>


<script>
  module.exports = {
    props : ['hidelogo']
  }

</script>

<style scoped>
.header{
  background: #f7f7f7;
  height: 44px;
  border-bottom: 2px solid #d5d5d5;
}
.header .container{
  margin:0 auto;
  width: 1220px;
  text-align: right;
  height:100%;
}
.header .container img{
  float: left;
  margin-left: 10px;
}
.header .container .header_nav{
  float: right;
}
.header .container .header_nav li{
  float: left;
  height: 44px;
  line-height: 44px;

  padding:0  10px;
  position: relative;
}
.header .container .header_nav li:after{
  content: "";
  display: block;
  height: 15px;
  width: 1px;
  position: absolute;
  right: 0;
  top: 15px;
  background: #b6b6b6;
}
.header .container .header_nav li.down_load_app{
  color: #82a9e3;
  padding-left: 25px;
  background: url('/static/images/common/phone_icon.jpg') no-repeat left center;
}
.header .container .header_nav li.tel{
  color: #c3c3c3
}
</style>

