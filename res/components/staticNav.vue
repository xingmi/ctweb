<template>
  <ul class="nav">
    <li :class="{current: (currentindex == 1)}"><a href="/aboutUs.html">公司简介</a></li>
    <li :class="{current: (currentindex == 2)}"><a href="/mediaReports.html">媒体报道</a></li>
    <li :class="{current: (currentindex == 3)}"><a href="/contactUs.html">联系我们</a></li>
    <li :class="{current: (currentindex == 4)}"><a href="/joinUs.html">招贤纳士</a></li>
    <li :class="{current: (currentindex == 5)}"><a href="/declaration.html">服务条款</a></li>
    <li :class="{current: (currentindex == 6)}"><a href="/opinion.html">意见反馈</a></li>
  </ul>
</template>

<script>
  module.exports = {
    props : ['currentindex']
  }

</script>