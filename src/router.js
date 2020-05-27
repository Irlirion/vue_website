import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {path: '/vue_website/', component: Home},
        {path: '/about', component: () => import('./views/About.vue')},
        {path: '/calculator', component: () => import('./views/Calculator.vue')},
        {path: '/test', component: () => import('./views/Tests.vue')},
        {path: '/cv', component: () => import('./views/ComputerVision.vue')},
        {path: '/feedback', component: () => import('./views/Feedback.vue')},
    ]
})
