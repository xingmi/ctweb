<template>
  <div class="city_change" v-if="!hideCityItem">
    <div class="city_list">
      <span class="close" @click="closeItem()">×</span>
      <ul>
        <li v-for="(provincial,index) in cities">
          <h4>{{provincial.name}}</h4>
          <span v-for="(city,i) in provincial.cities" @click="selectCity(index,i)">
            {{city.name}}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
var bus = require('../config/bus');
module.exports = {
  data : function(){
    return {
      cities : [],
      hideCityItem : true
    }
  },
  mounted : function(){
    this.cities = JSON.parse(sessionStorage['mapData']).cities
  },
  created : function(){
    var that = this;
    bus.$on('hide-cityItem',function(){
      that.closeItem()
    })
  },
  methods : {
    closeItem : function(){
      this.hideCityItem = !this.hideCityItem;
    },
    selectCity : function(index,i){
      var mapData = JSON.parse(sessionStorage['mapData'])
      mapData.current = mapData.cities[index].cities[i]
      sessionStorage['mapData'] = JSON.stringify(mapData);
      window.location.reload();
    }
  }
}
</script>
<style scoped>
.city_change{
  position: absolute;
  top:100px;
  left: 50%;
  width: 650px;
  min-height: 500px;
}
.city_change .city_list{
  position: absolute;
  width: 650px;
  left: -50%;
  background: #FFF;
  padding: 20px;
  border: 1px solid #cacaca;
  border-radius: 5px;
  z-index:10;
}
.city_change .city_list .close{
  position: absolute;
  right: 0;
  top: 0;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 30px;
  color: #7b7b7b;
}
.city_change .city_list .close:hover{
  cursor: pointer;
}
.city_change .city_list li{
  margin-bottom: 5px;
}
.city_change .city_list li h4{
  font-weight: bold;
  color: #3c74e3;
}
.city_change .city_list li span{
  width: 75px;
  text-align: center;
  display: inline-block;
  color: #1f64a9;
  margin-top: 5px;
}
.city_change .city_list li span:hover{
  cursor: pointer;
}
</style>