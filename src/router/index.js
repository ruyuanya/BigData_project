import { createRouter, createWebHistory } from 'vue-router'
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
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    meta: {requiresAuth: true},
    children: [
      {
        path: 'books/BookList',
        name: 'BookList',
        component: () => import('@/views/admin/books/BookList.vue')
      },
      // ... 更多路由
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router