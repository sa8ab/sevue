import Vue from 'vue'
import App from './App.vue'
import Revux from '../src/main'
import VueRouter from 'vue-router'
import router from './router'
import './style/main.scss'
import "boxicons/css/boxicons.min.css";

Vue.config.productionTip = false
Vue.use(Revux, {
  colors: {
    prm: '#22a6b3'
  },
  iconPrefix: 'bx'
})

Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
