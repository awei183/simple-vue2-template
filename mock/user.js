/**
 * @type {Array<import('vite-plugin-mock').MockMethod>}
 */
const userApi = [
  {
    url: '/api/auth/login',
    method: 'post',
    response: {
      code: 200,
      message: 'success',
      data: 'xxxx_token_value_random_898',
    },
  },
  {
    url: '/api/auth/me',
    method: 'get',
    response: {
      code: 200,
      message: 'success',
      data: {
        id: 1,
        username: 'root',
        roles: ['root'],
        avatar: '/favicon.ico',
        nickname: 'Root',
      },
    },
  },
  {
    url: '/api/user/password',
    method: 'put',
    response: {
      code: 200,
      message: 'success',
    },
  },
]
export default userApi
