import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    meta: {requiresAuth: true},
    children: [
      // ... 其他路由
      {
        path: 'books/BookList',
        name: 'BookList',
        component: () => import('@/views/admin/books/BookList.vue')
      },
      // {
      //   path: 'books/add',
      //   name: 'BookAdd',
      //   component: () => import('@/views/admin/books/BookAdd.vue')
      // }
      // ... 更多路由
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
