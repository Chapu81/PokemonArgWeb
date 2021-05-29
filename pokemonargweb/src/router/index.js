import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Home_admin from '../views/admin/Home_a.vue'
import Add_admin from '../views/admin/Add_a.vue'
import Orders_admin from '../views/admin/Orders_a.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  
  {
    path: '/login-admin',
    name: 'Login',
    component: Login
  },
  {
    path: '/inicio-admin',
    name: 'Home Admin',
    component: Home_admin
  },
  {
    path: '/agregar/:opt',
    name: 'Add Admin',
    component: Add_admin
  },
  {
    path: '/pedidos-admin',
    name: 'Orders',
    component: Orders_admin
  },

  {
    path: '/cartas',
    name: 'Cards',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "cards" */ '../views/Cards.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
