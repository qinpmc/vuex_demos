import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 经实测，store 可以在 App.vue 中导入，然后作为该组件的 state 属性
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
