import Vue from 'vue'
import App from './App.vue'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import './scss/vue-material.scss'
Vue.use(VueMaterial)

import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/:string?',
            name: 'Landing Page',
            component: () => import('@/components/List')
        }
    ]
})

const app = new Vue({
    el: '#app',
    router,
    render: h => h(App)
})