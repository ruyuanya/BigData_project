import request from '@/utils/request'

export function getBooks(params) {
  return request({
    url: '/books',
    method: 'get',
    params
  })
}

export function addBook(data) {
  return request({
    url: '/books',
    method: 'post',
    data
  })
}

export function updateBook(data) {
  return request({
    url: '/books',
    method: 'put',
    data
  })
}

export function deleteBook(id) {
  return request({
    url: `/books/${id}`,
    method: 'delete'
  })
}

export function login(data) {
  return request({
    url: '/auth/Userlogin',//登录接口地址
    method: 'post',//请求方法
    data//请求数据（用户名、密码、身份）
  })
}

export function getUserInfo() {
  return request({
    url: '/auth/getUserInfo',
    method: 'get'
  })
}