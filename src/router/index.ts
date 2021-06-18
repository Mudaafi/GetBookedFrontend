import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/book/:listingId',
    name: 'BookInfo',
    component: () => import('../views/BookInfo.vue'),
    props: true,
  },
  {
    path: '/faq',
    name: 'Faq',
    component: () => import('../views/Faq.vue'),
  },
  {
    path: '/rules',
    name: 'Rules',
    component: () => import('../views/Rules.vue'),
  },
  {
    path: '/verify/:code',
    name: 'Verify',
    component: () => import('../views/Verify.vue'),
    props: true,
  },
  {
    path: '/*',
    name: '404Page',
    component: () => import('../views/404.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
