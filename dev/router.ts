import { createRouter, createWebHashHistory } from 'vue-router'
import Home from "./pages/HomePage.vue";
import SelectPage from "./pages/SelectPage.vue";
import PaginationPage from "./pages/PaginationPage.vue";
import CheckboxPage from "./pages/CheckboxPage.vue";
import NotificationPage from "./pages/NotificationPage.vue";
import LoadingPage from "./pages/LoadingPage.vue";
import TabsPage from "./pages/TabsPage.vue";


const routes = [
  { path: '/', component: Home },
  { path: '/select', component: SelectPage },
  { path: '/pagination', component: PaginationPage },
  { path: '/checkbox', component: CheckboxPage },
  { path: '/notification', component: NotificationPage },
  { path: '/loading', component: LoadingPage },
  { path: '/tabs', component: TabsPage },
]

export default createRouter({
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})
