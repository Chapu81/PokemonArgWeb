import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
/* import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Add_admin from '../views/admin/Add_a.vue'
import Orders_admin from '../views/admin/Orders_a.vue' */

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    // component: Home
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/cartas',
    name: 'Cards',
    component: () => import(/* webpackChunkName: "cards" */ '../views/Cards.vue')
  },
  {
    path: '/busqueda/:card',
    name: 'Search',
    component: () => import(/* webpackChunkName: "cardssearch" */ '../views/Cards.vue')
  },

  /**** ADMIN ****/
  {
    path: '/login-admin',
    name: 'Login',
    // component: Login
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  
  {
    path: '/agregar/:opt',
    name: 'Add Admin',
    // component: Add_admin
    component: () => import(/* webpackChunkName: "add" */ '../views/admin/Add_a.vue'),
    beforeEnter: (to, from, next) => {
      // Is the user name not null
      if(store.getters.logued) {
        next();
      } else {
        next({ name: 'Home' });
      }
    }
  },
  {
    path: '/pedidos-admin',
    name: 'Orders',
    // component: Orders_admin
    component: () => import(/* webpackChunkName: "orders" */ '../views/admin/Orders_a.vue'),
    beforeEnter: (to, from, next) => {
      // Is the user name not null
      if(store.getters.logued) {
        next();
      } else {
        next({ name: 'Home' });
      }
    }
  },
  {
    path: '/usuarios-descuentos',
    name: 'Discounts',
    component: () => import(/* webpackChunkName: "discounts" */ '../views/admin/Discounts_a.vue'),
    beforeEnter: (to, from, next) => {
      // Is the user name not null
      if(store.getters.logued) {
        next();
      } else {
        next({ name: 'Home' });
      }
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
