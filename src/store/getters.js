const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  username: state => state.user.username,
  nickname: state => state.user.nickname,
  roles: state => state.user.roles,
  userId: state => state.user.id,
  permission_routes: state => state.permission.routes,
  currentUser: state => state.user,
}
export default getters
