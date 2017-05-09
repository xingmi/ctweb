<template>
    <div class="footer">
      <img src="../../static/images/common/bottom_banner.jpg">
      <div class="footer_nav">
        <ul>
          <li><a href="/aboutUs.html">关于长天金融</a></li>
          <li><a href="/contactUs.html">联系我们</a></li>
          <li><a href="/joinUs.html">加入我们</a></li>
          <li><a href="/declaration.html">免责声明</a></li>
          <li><a href="/opinion.html">建议与投诉</a></li>
          <li><a href="/aboutUs.html">了解更多</a></li>
        </ul>
      </div>
      <div class="icp">
        <p>版权所有©上海长荷网络科技有限公司 未经许可不得复制、转载或摘编，违者必究</p>
        <p>备案/许可证编号为：沪ICP备17007132号</p>
      </div>
    </div>
</template>


<style scoped>
.footer{
  min-width: 1200px;
  background: #3c74e3;
  margin-top:20px;
}
.footer img{
  width: 100%;
}
.footer .footer_nav{
  text-align: center;
  width: 100%;
  background: #efefef;
  height: 50px;
  padding-top: 13px;
}

.footer .footer_nav li{
  display: inline-block;
  padding: 0 25px;
  border-right: 1px solid #666666;
  font-size: 18px;
  color: #656565;
}
.footer .footer_nav li:last-child{
  border-right: 0;
}
.icp{
  padding: 10px 0;
  text-align: center;
  background: #FFF;
  line-height: 40px;
}
</style>
