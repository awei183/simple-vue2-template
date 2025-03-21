import { isEmpty } from 'lodash-es'
import { AUTHENTICATION_LAYOUT } from './constants'

export const resolve = (path, base) => new URL(path, `http://eq.com${base}`).pathname
// 只处理到二级菜单
export function flatMapRoute(routes, parent) {
  return routes.flatMap(route => {
    if (route.hidden) {
      return []
    }
    if (!isEmpty(route.meta)) {
      const { meta } = route
      return [
        {
          ...meta,
          path: parent ? resolve(route.path, parent.path) : route.path,
          children: flatMapRoute(route.children || []),
        },
      ]
    }
    if (!isEmpty(route.children)) {
      return flatMapRoute(route.children, route)
    }
    return []
  })
}

export function flatMapRouteMenus(permission_routes) {
  // filter path, hidden and component.name === AUTHENTICATION_LAYOUT

  const filters = permission_routes.filter(
    ({ path, hidden, component }) => !!path && !hidden && component && component.name === AUTHENTICATION_LAYOUT,
  )
  return flatMapRoute(filters)
}

export const TAG_STORE_KEY = 'level_school_system_tags'

export function initTags4LS() {
  try {
    return JSON.parse(localStorage.getItem(TAG_STORE_KEY) || '[]')
  } catch (error) {
    return []
  }
}

export function storeTags4LS(tags) {
  return localStorage.setItem(TAG_STORE_KEY, JSON.stringify(tags))
}

export function removeTags4LS() {
  return localStorage.removeItem(TAG_STORE_KEY)
}
