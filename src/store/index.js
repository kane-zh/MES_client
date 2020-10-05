import Vue from 'vue'
import Vuex from 'vuex'

// 全局注册vueX
Vue.use(Vuex)

const state = sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {
  loginInfor: {
    name: '',
    id: '',
    token: '',
    permissions: '',
    is_superuser: false,
    config: ''
  }
}
const action = {
}
const mutations = {
  saveLoginInfor (state, payload) {
    state.loginInfor.name = payload.name
    state.loginInfor.id = payload.id
    state.loginInfor.token = payload.token
    state.loginInfor.permissions = payload.permissions
    state.loginInfor.is_superuser = payload.is_superuser
    state.loginInfor.config = payload.config
  }
}
const getters = {
  getLoginInfor (state) {
    return state.loginInfor
  }
}

export default new Vuex.Store({
  state,
  action,
  mutations,
  getters
})
