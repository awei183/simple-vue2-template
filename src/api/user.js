import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/auth/login',
    method: 'post',
    data,
  })
}

export function getInfo(token) {
  return request({
    url: '/api/auth/me',
    method: 'get',
  })
}

export function logout() {
  return new Promise(r => setTimeout(() => r(), 500))
}
