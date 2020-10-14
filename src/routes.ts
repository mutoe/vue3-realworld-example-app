import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './pages/Home.vue'

export type AppRouteNames = 'global-feed'
  |'my-feed'
  |'tag'
  |'article'
  |'login'
  |'register'
  |'profile'
  |'profile-favorites'
  |'editor'
  |'settings'

const router = createRouter({
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
      name: 'login',
      path: '/login',
      component: () => import('./pages/Login.vue'),
    },
    {
      name: 'register',
      path: '/register',
      component: () => import('./pages/Register.vue'),
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
      name: 'editor',
      path: '/editor',
      redirect: '/',
    },
    {
      name: 'settings',
      path: '/settings',
      redirect: '/',
    },
  ],
})

export default router
