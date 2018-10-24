import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import MultiActivity from '@/components/multiActivity'
import Login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/multiActivity',
      name: 'multiActivity',
      component: MultiActivity
    }
  ]
})
