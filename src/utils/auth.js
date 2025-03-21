import Cookies from 'js-cookie'
import defaultSettings from '@/settings'
import md5 from 'md5'

const TokenKey = defaultSettings.tokenKey || 'token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function encodePassword(password) {
  return md5(password)
}
