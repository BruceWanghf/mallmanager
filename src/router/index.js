import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'
import Portal from '@/components/portal/portal.vue'
import Rights from '@/components/rights/right.vue'
import Role from '@/components/role/role.vue'
import { Message } from 'element-ui'
import Goods from '@/components/goods/goodslist.vue'


Vue.use(Router)

const router = new Router({
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
          name: 'roles',
          path: '/roles',
          component: Role
        },
        {
          name: 'goods',
          path: '/goods',
          component: Goods
        }
      ]
    }

  ]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    const token = localStorage.getItem('token')
    if (!token) {
      Message.warning('回到登录页')
      router.push({ name: 'login' })
      return
    }
    next()

  }
})
export default router
