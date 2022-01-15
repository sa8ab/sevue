import Vue from 'vue'
import App from './App.vue'
import Revux from '../src/main'
import './style/main.scss'
Vue.config.productionTip = false
Vue.use(Revux, {
  theme: {
    colors: {
      prm: '225, 159, 67'
    }
  }
})

new Vue({
  render: h => h(App),
}).$mount('#app')
