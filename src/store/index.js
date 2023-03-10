import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'
Vue.use(Vuex)

export default new Vuex.Store({
  // 模块化
  modules: {
    tab
  }
})
