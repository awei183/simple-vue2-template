import { createRouter, createWebHistory } from 'vue-router'

/* Layout */
import Layout from '@/layouts/authentication'

/**
 * Note: sub-menu only appear when route children.length >= 1
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'ep:setting'           the icon show in the sidebar, source by 'iconify
    noCache: true                if set true, the page will no be cached(default is false)
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
  }
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true,
  },
  {
    path: '/404',
    component: () => import('@/views/error/404.vue'),
    hidden: true,
  },
  {
    path: '/401',
    component: () => import('@/views/error/401.vue'),
    hidden: true,
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
        meta: { title: '首页', icon: 'ep:home-filled' },
      },
      {
        path: '/profile',
        component: () => import('@/views/profile/index.vue'),
        name: 'profile',
        meta: { title: '个人中心', icon: 'gg:profile' },
      },
    ],
  },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  { path: '/:pathMatch(.*)*', redirect: '/404', hidden: true },
  { path: '/:pathMatch(.*)', redirect: '/404', hidden: true },
]
const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
})

export function resetRouter() {
  router.getRoutes().forEach(r => router.removeRoute(r))
  constantRoutes.forEach(r => router.addRoute(r))
  return router
}

export default router
