import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { createMutations } from '../helper'

const state = {
  token: getToken(),
  username: 'user',
  nickname: 'User',
  avatar: '/favicon.ico',
  roles: [],
  id: -1,
}

const mutations = createMutations(state)

const actions = {
  // user login
  async login({ commit }, userInfo) {
    const response = await login(userInfo)
    const { data: token } = response
    commit('SET_TOKEN', token)
    setToken(token)
    return token
  },

  // get user info
  async getInfo({ commit }) {
    const response = await getInfo()
    const { data } = response

    if (!data) {
      throw new TypeError('Verification failed, please Login again.')
    }
    const { roles, username, nickname, avatar, id } = data
    // roles must be a non-empty array
    if (!roles || roles.length <= 0) {
      throw new TypeError('me: roles must be a non-null array!')
    }
    commit('SET_ROLES', roles)
    commit('SET_USERNAME', username)
    commit('SET_NICKNAME', nickname)
    commit('SET_AVATAR', avatar)
    commit('SET_ID', id)
    return data
  },

  // user logout
  async logout({ commit }) {
    await logout()
    commit('SET_TOKEN', '')
    commit('SET_ROLES', [])
    removeToken()
    resetRouter()
  },

  // remove token
  async resetToken({ commit }) {
    commit('SET_TOKEN', '')
    commit('SET_ROLES', [])
    removeToken()
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
