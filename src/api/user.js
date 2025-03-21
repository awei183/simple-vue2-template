import { encodePassword } from '@/utils/auth'
import request from '@/utils/request'

/**
 * login
 * @param {{username: string, password: string}} data
 * @returns
 */
export async function login(data) {
  console.log('ddd')
  const reset = { ...data, password: encodePassword(data.password) }
  return request.post('/api/auth/login', reset)
}

/**
 * get current user info
 * @returns
 */
export async function getInfo() {
  return request.get('/api/auth/me')
}

/**
 * logout
 * @returns
 */
export function logout() {
  return new Promise(r => setTimeout(() => r(), 500))
}

/**
 * update password
 * @param {{userId: string, newPassword: string}} data
 * @returns
 */
export async function updatePassword(data) {
  const reset = { ...data, newPassword: encodePassword(data.newPassword) }
  return request.put('/api/user/password', reset)
}
