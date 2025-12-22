import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'
import HomeView from '../views/HomeView.vue'
import LoginPage from '../views/LoginPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: () => import('../views/RegisterPage.vue')
  }, 
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'books/BookList',
        name: 'BookList',
        component: () => import('@/views/admin/books/BookList.vue'),
        meta: { title: '图书列表' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userInfo = localStorage.getItem('userInfo')
  
  if (to.meta.requiresAuth) {
    if (!token || !userInfo) {
      // 未登录，跳转到登录页
      next('/login')
    } else {
      // 已登录，检查权限
      const user = JSON.parse(userInfo)
      if (to.meta.role && to.meta.role !== user.role) {
        // 权限不足
        ElMessage.error('权限不足')
        next(from.path)
      } else {
        next()
      }
    }
  } else if (to.path === '/login' && token) {
    // 已登录，跳转到首页
    next('/')
  } else {
    next()
  }
})

export default router