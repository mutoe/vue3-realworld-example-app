import { createRouter, createWebHashHistory, RouteParams } from 'vue-router'
import Home from './pages/Home.vue'
import { isAuthorized } from './store/user'

export type AppRouteNames = 'global-feed'
| 'my-feed'
| 'tag'
| 'article'
| 'create-article'
| 'edit-article'
| 'login'
| 'register'
| 'profile'
| 'profile-favorites'
| 'settings'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'global-feed',
      path: '/',
      component: Home,
    },
    {
      name: 'my-feed',
      path: '/my-feeds',
      component: Home,
    },
    {
      name: 'tag',
      path: '/tag/:tag',
      component: Home,
    },
    {
      name: 'article',
      path: '/article/:slug',
      component: () => import('./pages/Article.vue'),
    },
    {
      name: 'edit-article',
      path: '/article/:slug/edit',
      component: () => import('./pages/EditArticle.vue'),
    },
    {
      name: 'create-article',
      path: '/article/create',
      component: () => import('./pages/EditArticle.vue'),
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('./pages/Login.vue'),
      beforeEnter: () => !isAuthorized.value,
    },
    {
      name: 'register',
      path: '/register',
      component: () => import('./pages/Register.vue'),
      beforeEnter: () => !isAuthorized.value,
    },
    {
      name: 'profile',
      path: '/profile/:username',
      component: () => import('./pages/Profile.vue'),
    },
    {
      name: 'profile-favorites',
      path: '/profile/:username/favorites',
      component: () => import('./pages/Profile.vue'),
    },
    {
      name: 'settings',
      path: '/settings',
      component: () => import('./pages/Settings.vue'),
    },
  ],
})

export function routerPush (name: AppRouteNames, params?: RouteParams): ReturnType<typeof router.push> {
  if (params !== undefined) {
    return router.push({
      name,
      params,
    })
  } else {
    return router.push({ name })
  }
}
