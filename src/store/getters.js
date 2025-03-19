const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  username: state => state.user.name,
  roles: state => state.user.roles,
  userId: state => state.user.id,
  permission_routes: state => state.permission.routes,
}
export default getters
