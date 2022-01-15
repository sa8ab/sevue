import Vue from 'vue'
import App from './App.vue'
import Revux from '../src/main'
Vue.config.productionTip = false
Vue.use(Revux, {
  theme: {
    // colors: {
    //   primary: '255, 159, 67'
    // }
  }
})

new Vue({
  render: h => h(App),
}).$mount('#app')
