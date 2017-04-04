<template>
    <div class="footer">
      <img src="../../static/images/common/bottom_banner.jpg">
      <div class=footer_nav>
        <ul>
          <li><a href="/aboutUs.html">关于投贷天下</a></li>
          <li><a href="">联系我们</a></li>
          <li><a href="">加入我们</a></li>
          <li><a href="">面责声明</a></li>
          <li><a href="">建议与投诉</a></li>
          <li><a href="">了解更多</a></li>
        </ul>
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
</style>
