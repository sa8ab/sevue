import { createRouter, createWebHashHistory } from 'vue-router'
import Home from "./pages/HomePage.vue";
import SelectPage from "./pages/SelectPage.vue";


const routes = [
  { path: '/', component: Home },
  { path: '/select', component: SelectPage },
]

export default createRouter({
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})
