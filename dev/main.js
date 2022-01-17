import Vue from 'vue'
import App from './App.vue'
import Revux from '../src/main'
import './style/main.scss'
import "boxicons/css/boxicons.min.css";

Vue.config.productionTip = false
Vue.use(Revux, {
  theme: {
    colors: {
      prm: '0, 151, 230'
    }
  },
  iconPrefix: 'bx'
})

new Vue({
  render: h => h(App),
}).$mount('#app')
