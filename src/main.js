// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import Vuelidate from 'vuelidate'
import axios from './api/axiosRequest'
import 'iview/dist/styles/iview.css'
import './main.css'
// 注册到全局
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(iView)
Vue.use(Vuelidate)
/* eslint-disable no-new */
let startApp = function () {
  axios.get('/static/basicConfig.json').then((res) => {
    // 基础地址
    axios.defaults.baseURL = res.data.BASE_URL
    store.commit({
      type: 'saveConfig',
      attach_attribute: res.data.attach_attribute,
      function_select: res.data.function_select
    })
    new Vue({
      el: '#app',
      router,
      store,
      components: {
        App
      },
      template: '<App/>'
    })
  })
}

startApp()
