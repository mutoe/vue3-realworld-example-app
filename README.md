# ![RealWorld Example App](logo.png)

[![Codecov branch](https://img.shields.io/codecov/c/github/mutoe/vue3-realworld-example-app/master?logo=codecov&style=for-the-badge)](https://app.codecov.io/gh/mutoe/vue3-realworld-example-app/branch/master)
[![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/mutoe/vue3-realworld-example-app/Test/master?label=master&logo=github&style=for-the-badge)](https://github.com/mutoe/vue3-realworld-example-app/actions?query=branch%3Amaster)
[![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/mutoe/vue3-realworld-example-app/Test/script-setup?label=ref-sugar&logo=github&style=for-the-badge)](https://github.com/mutoe/vue3-realworld-example-app/actions?query=branch%3Aref-sugar)

> ### [Vue3](https://v3.vuejs.org/) codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.

- [Demo](https://vue3-realworld-example-app-mutoe.vercel.app)
- [RealWorld](https://github.com/gothinkster/realworld)


This codebase was created to demonstrate a fully fledged fullstack application built with **Vue3** including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the **Vue3** community styleguides & best practices.

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.

# What works?

- [x] [Vite](https://github.com/vitejs/vite)
- [x] [Composition API](https://composition-api.vuejs.org/)
- [x] [SFC \<script setup> sugar](https://v3.vuejs.org/api/sfc-script-setup.html)
- [x] [Suspense](https://v3.vuejs.org/guide/component-dynamic-async.html#using-with-suspense) (Experimental)
- [x] [Vue router](https://next.router.vuejs.org/)
- [x] State management ([Harlem](https://github.com/andrewcourtice/harlem) ([await Vuex v5](https://github.com/mutoe/vue3-realworld-example-app/issues/15)))
- [x] Type system [TypeScript](https://www.typescriptlang.org/) [Vue tsc](https://github.com/johnsoncodehk/vue-tsc)
- [x] Linter [ESLint](https://eslint.vuejs.org/)
- [x] Unit test ([Vue Testing Library](https://testing-library.com/docs/vue-testing-library/intro))
- [x] E2E test ([Cypress](https://docs.cypress.io))

#### What works in [ref-sugar branch](https://github.com/mutoe/vue3-realworld-example-app/tree/ref-sugar) (based on the master branch)

- [x] [Script ref sugar (take 2)](https://github.com/vuejs/rfcs/discussions/369)
- [ ] Unit test [Cypress component test](https://docs.cypress.io/guides/component-testing/introduction#What-is-Component-Testing)

> _[Why we have the second branch?](https://github.com/mutoe/vue3-realworld-example-app/commit/c0c983dba08cb31fc96bbc3eb7f15faf469d0624#commitcomment-47600736)_

# Getting started

```shell script
yarn install

# Development
yarn dev

# Build dist
yarn build

# Run unit tests
yarn test:unit

# Run E2E tests
yarn cypress open # with GUI
yarn test:e2e # headless
```

# Contributors

<a href="https://github.com/mutoe/vue3-realworld-example-app/graphs/contributors">
  <img src="https://contributors-img.web.app/image?repo=mutoe/vue3-realworld-example-app" />
</a>

Made with [contributors-img](https://contributors-img.web.app).

## Vue related implementations of the Realworld app

- [gothinkster/vue-realworld-example-app](https://github.com/gothinkster/vue-realworld-example-app) - vue2, js
- [AlexBrohshtut/vue-ts-realworld-app](https://github.com/AlexBrohshtut/vue-ts-realworld-app) - vue2, ts, class-component
- [devJang/nuxt-realworld](https://github.com/devJang/nuxt-realworld) - nuxt, ts, composition api
- [levchak0910/vue3-ssr-realworld-example-app](https://github.com/levchak0910/vue3-ssr-realworld-example-app) - vue3, ssr

## Sponsor

Thanks **JetBrains** for providing IDE support!
