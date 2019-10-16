// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Mybread from '@/components/custom/mybread.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import MyHttpServer from '@/plugins/http.js'
import moment from 'moment'
Vue.use(MyHttpServer)

import '@/assets/css/reset.css'
import router from './router'

Vue.config.productionTip = false

//全局过滤器
Vue.filter('fmdate', (v)=>{
  return moment(v).format('YYYY-MM-DD')
})

Vue.component(Mybread.name,Mybread)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
