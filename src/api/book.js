import request from '@/utils/request'
let baseURL = 'http://localhost:7003'
export function getBooks(params) {
  return request({
    url: baseURL + '/api/GetBook',
    method: 'get',
    params
  })
}

// export function addBook(data) {
//   return request({
//     url: '/api/books',
//     method: 'post',
//     data
//   })
// }

// export function updateBook(data) {
//   return request({
//     url: '/api/books',
//     method: 'put',
//     data
//   })
// }

// export function deleteBook(id) {
//   return request({
//     url: `/api/books/${id}`,
//     method: 'delete'
//   })
// }

export function login(data) {
  return request({
    url: baseURL + '/api/UserLogin',
    method: 'post',
    data
  })
}

export function getUserInfo() {
  return request({
    url: baseURL + '/api/GetUserInfo',
    method: 'get'
  })
}

export function register(data){
  return request({
    url: baseURL + '/api/UserRegister',
    method: 'post',
    data: {
      username: data.username,
      password: data.password,
      role: data.role
    }
  })
}