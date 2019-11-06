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
import GoodsAdd from '@/components/goods/goodsadd.vue'
import CatParams from '@/components/goods/catparams.vue'
import Goodscat from '@/components/goods/goodscat.vue'
import OrderList from '@/components/order/orderList.vue'
import Reports from '@/components/reports/reports.vue'


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
        },
        {
          name: 'goodsadd',
          path: '/goodsadd',
          component: GoodsAdd
        },
        {
          name: 'params',
          path: '/params',
          component: CatParams
        },
        {
          name: 'categories',
          path: '/categories',
          component: Goodscat
        },
        {
          name: 'orders',
          path: '/orders',
          component: OrderList
        },
        {
          name: 'reports',
          path: '/reports',
          component: Reports
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
