import { createRouter, createWebHashHistory, RouterView } from 'vue-router'
import type { RouteRecordRaw, RouteRecordName } from 'vue-router'
// import { createRouterGuard } from '@/router/router-guards'
import auth from '@/utils/auth'
import i18n from '@/i18n'
/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect/:path(.*)*',
    name: 'Redirect',
    meta: { hidden: true, ignoreAuth: true },
    redirect: to => {
      const path = to.params.path
      return { path: `/${Array.isArray(path) ? path.join('/') : path}`, query: to.query, replace: true }
    }
  },
  {
    path: '/exception',
    name: 'Exception',
    redirect: '/exception/404',
    component: RouterView,
    meta: { title: 'Exception', hidden: true, ignoreAuth: true },
    children: [
      {
        path: '404',
        name: '404',
        component: () => import('@/views/exception/404.vue'),
        meta: { title: '404', ignoreAuth: true }
      },
      {
        path: '500',
        name: '500',
        component: () => import('@/views/exception/500.vue'),
        meta: { title: '500', ignoreAuth: true }
      }
    ]
  },
  {
    path: '/:path(.*)*',
    name: 'ErrorPage',
    meta: { hidden: true, ignoreAuth: true },
    redirect: to => {
      return auth.getToken()
        ? { name: '404', query: { path: to.path, ...to.query }, replace: true }
        : { name: 'Login', query: { redirect: to.path, ...to.query }, replace: true }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true, ignoreAuth: true }
  },
  {
    path: '/',
    name: 'Home',
    redirect: '/cases',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: 'cases',
        name: 'Cases',
        component: () => import('@/views/cases/index.vue'),
        meta: {
          title: i18n.global.t('router.cases'),
          icon: 'Element:Odometer',
          affixTab: true,
          sort: -1,
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/slide', // Add leading slash
    name: 'Slide',
    component: () => import('@/layout/index.vue'), // Wrap the page with the layout
    children: [
      {
        path: '',
        name: 'Slide',
        component: () => import('@/views/slide/index.vue'),
        meta: { title: i18n.global.t('router.slide'), icon: 'Element:Document', affixTab: true }
      }
    ]
  },
  {
    path: '/newdevice', // Add leading slash
    name: 'Newdevice',
    component: () => import('@/layout/index.vue'), // Wrap the page with the layout
    children: [
      {
        path: '',
        name: 'Newdevice',
        component: () => import('@/views/newdevice/index.vue'),
        meta: { title: i18n.global.t('router.newdevice'), icon: 'Element:Document', affixTab: true }
      }
    ]
  },
  {
    path: '/pathogen', // Add leading slash
    name: 'Pathogen',
    component: () => import('@/layout/index.vue'), // Wrap the page with the layout
    children: [
      {
        path: '',
        name: 'Pathogen',
        component: () => import('@/views/pathogen/index.vue'),
        meta: { title: i18n.global.t('router.pathogen'), icon: 'Element:Document', affixTab: true }
      }
    ]
  },
  {
    path: '/bigview', // Add leading slash
    name: 'Bigview',
    component: () => import('@/layout/index.vue'), // Wrap the page with the layout
    children: [
      {
        path: '',
        name: 'Bigview',
        component: () => import('@/views/pathogen/bigview.vue'),
        meta: { title: i18n.global.t('router.bigview'), icon: 'Element:Document', affixTab: true }
      }
    ]
  },
  {
    path: '/review', // Add leading slash
    name: 'Review',
    component: () => import('@/layout/index.vue'), // Wrap the page with the layout
    children: [
      {
        path: '',
        name: 'review',
        component: () => import('@/views/pathogen/review.vue'),
        meta: { title: i18n.global.t('router.review'), icon: 'Element:Document', affixTab: true }
      }
    ]
  }
]

/**
 * 创建路由
 */
const createAppRouter = () =>
  createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL), // hash 模式
    // history: createWebHistory(import.meta.env.BASE_URL), // HTML5 模式
    routes: constantRoutes
  })

const router = createAppRouter()

router.beforeEach((to, from, next) => {
  const isAuthenticated = auth.getToken() // Check if the token exists

  if (to.meta.requiresAuth && !isAuthenticated) {
    // If the route requires authentication and the user is not authenticated
    next({
      name: 'Login',
      query: { redirect: to.fullPath } // Redirect back to the original route after login
    })
  } else if (to.name === 'Login' && isAuthenticated) {
    // If the user is already logged in and tries to access the login page
    next({ name: 'Home' }) // Redirect to the home/dashboard
  } else {
    // Allow navigation
    next()
  }
})

// 添加路由守卫等
// createRouterGuard(router)

export default router

// 重置路由
export const resetRouter = () => {
  router
    .getRoutes()
    .map(e => e.name as RouteRecordName)
    .forEach(router.removeRoute)
  constantRoutes.forEach(router.addRoute)
}
