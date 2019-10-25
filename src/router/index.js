import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'
import Portal from '@/components/portal/portal.vue'
import Rights from '@/components/rights/right.vue'
import Role from '@/components/role/role.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        { 
          name: 'users', 
          path: 'users', 
          component: Users
        },
        {
          name: 'portal', 
          path: '/', 
          component: Portal
        },
        {
          name: 'rights', 
          path: '/rights', 
          component: Rights
        },
        {
          name: 'role', 
          path: '/role', 
          component: Role
        }
      ]
    }

  ]
})
