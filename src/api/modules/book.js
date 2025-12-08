import request from '@/utils/request'

// 获取图书列表
export function getBooks(params) {
  return request({
    url: '/books',
    method: 'get',
    params
  })
}

// 添加图书
export function addBook(data) {
  return request({
    url: '/books',
    method: 'post',
    data
  })
}

// 更新图书
export function updateBook(data) {
  return request({
    url: `/books/${data.id}`,
    method: 'put',
    data
  })
}

// 删除图书
export function deleteBook(id) {
  return request({
    url: `/books/${id}`,
    method: 'delete',
  })
}