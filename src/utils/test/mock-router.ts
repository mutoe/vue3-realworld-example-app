import { createRouter, createWebHistory } from 'vue-router'

export const routerForTests = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: { template: 'Home page' },
    },
    {
      path: '/foo',
      name: 'foo',
      component: { template: 'Foo page' },
    },
  ],
})
