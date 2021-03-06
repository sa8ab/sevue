import VueRouter from "vue-router";
import HomePage from './pages/HomePage'
import SecondPage from './pages/SecondPage'
import ThirdPage from './pages/ThirdPage'

const routes = [
    { path: '/', component: HomePage },
    { path: '/second', component: SecondPage },
    { path: '/third', component: ThirdPage },
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router