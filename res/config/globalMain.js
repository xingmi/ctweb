/*
** 总配置
*/
var Cookie = require('../lib/cookie');
var utility = require('./utility')

var Vue      = require('vue');
var VueResource = require('../lib/vue-resource');
var env    = require('./env');
var Ajax = require('../config/ajax');
var vueTmpFilter = require('./filter');
var io = require('../lib/growingio')
var id = ''

require('./directive');

Vue.use(VueResource);

// Vue.http.options.emulateHTTP = true;
Vue.http.options.emulateJSON = true;

Vue.http.interceptors.push(function(request, next) {
  if(!sessionStorage['mapData']){
    Ajax.get(env.api+'constants.json',function(datas){
        var datas = JSON.parse(datas);
        if(datas.code == 0){
          sessionStorage['mapData'] = JSON.stringify(datas.data)
          vueTmpFilter(sessionStorage['mapData']);
          _.extend(request.params,{
          'city' : JSON.parse(sessionStorage['mapData']).current.id
          })
          next();
        }
    })
  }else{
    vueTmpFilter(sessionStorage['mapData'])
    _.extend(request.params,{
    'city' : JSON.parse(sessionStorage['mapData']).current.id
    })
    next()
  }
});

if(sessionStorage['openid']){
  id = sessionStorage['openid']
}else{
  id = Math.random().toString(36).substr(2);
  sessionStorage['openid'] = id
}

module.exports = {
    api : env.api,
    openId : id,
}