import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//按需引入
// import { Button, Row } from 'element-ui';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入mockjs
import './api/mock'
import Cookie from 'js-cookie'

// 添加全局前置导航守卫
router.beforeEach((to,from,next)=>{
  // 判断token是否存在
  const token = Cookie.get('token')
  // token不存在，说明当前用户是未登录，应该跳转至登录页
  if(!token && to.name !== 'login'){
    next({name:'login'})
  }else if(token && to.name === 'login'){
    // token存在，说明用户登如，此时跳转至首页
    next({name:'home'})
  }else{
    next()
  }
})

Vue.config.productionTip = false
// 全局注入
Vue.use(ElementUI)
// Vue.use(Button)
// Vue.use(Row)
// 页面刷新是，真个页面会初始化
new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    store.commit('addMenu',router)
  },
}).$mount('#app')
