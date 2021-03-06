import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/index.vue'),
    meta: {
      title: '导航'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/navigation/',
  routes
})

export default router
