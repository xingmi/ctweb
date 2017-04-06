<template>
  <ul class="nav">
    <li :class="{current: (currentindex == 1)}">
      <a class="first_nav" href="/aboutUs.html">公司简介</a>
      <ul class="jolin_lia">
        <li><a href="/aboutUs.html">公司概况</a></li>
        <li><a href="/team.html">核心团队</a></li>
        <li><a href="">企业文化</a></li>
        <li><a href="">公司文化</a></li>
      </ul>
    </li>
    <li :class="{current: (currentindex == 2)}"><a class="first_nav" href="/mediaReports.html">媒体报道</a></li>
    <li :class="{current: (currentindex == 3)}"><a class="first_nav" href="/contactUs.html">联系我们</a></li>
    <li :class="{current: (currentindex == 4)}"><a class="first_nav" href="/joinUs.html">招贤纳士</a></li>
    <li :class="{current: (currentindex == 5)}"><a class="first_nav" href="/declaration.html">服务条款</a></li>
    <li :class="{current: (currentindex == 6)}"><a class="first_nav" href="/opinion.html">意见反馈</a></li>
  </ul>
</template>

<script>
  module.exports = {
    props : ['currentindex']
  }

</script>