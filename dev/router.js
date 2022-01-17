import VueRouter from "vue-router";
import HomePage from './pages/HomePage'
import SecondPage from './pages/SecondPage'

const routes = [
    { path: '/', component: HomePage },
    { path: '/second', component: SecondPage },
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router