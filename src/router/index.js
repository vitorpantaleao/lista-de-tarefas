import { createRouter, createWebHistory } from 'vue-router'

const Home = import ('../views/Home.vue')
const Editar = import ('../views/Editar.vue')

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/editar/:nome', name: 'Editar', component: Editar },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router