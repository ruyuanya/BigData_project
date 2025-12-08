import BookList from '@/views/admin/books/BookList.vue'

export default [
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    redirect: '/admin/dashboard',
    children: [
      // ... 其他路由
      {
        path: 'books/list',
        name: 'BookList',
        component: BookList,
        meta: {
          title: '图书列表',
          requiresAuth: true,
          role: 'admin'
        }
      },
      // ... 更多路由
    ]
  }
]