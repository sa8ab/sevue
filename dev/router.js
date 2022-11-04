import VueRouter from "vue-router";
import HomePage from './pages/HomePage'
import SecondPage from './pages/SecondPage'
import ThirdPage from './pages/ThirdPage'
import Pagination from './pages/Pagination'
import TransitionMenu from './pages/TransitionMenu'

const routes = [
    { path: '/', component: HomePage },
    { path: '/second', component: SecondPage },
    { path: '/third', component: ThirdPage },
    { path: '/pagination', component: Pagination },
    { path: '/transition-menu', component: TransitionMenu },
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router