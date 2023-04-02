import { createRouter, createWebHashHistory } from 'vue-router'
import Home from "./pages/HomePage.vue";
import SelectPage from "./pages/SelectPage.vue";
import PaginationPage from "./pages/PaginationPage.vue";
import CheckboxPage from "./pages/CheckboxPage.vue";


const routes = [
  { path: '/', component: Home },
  { path: '/select', component: SelectPage },
  { path: '/pagination', component: PaginationPage },
  { path: '/checkbox', component: CheckboxPage },
]

export default createRouter({
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})