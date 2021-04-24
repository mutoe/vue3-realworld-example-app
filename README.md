# ![RealWorld Example App](logo.png)

[![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/mutoe/vue3-realworld-example-app/Test/master?label=master&logo=github&style=for-the-badge)](https://github.com/mutoe/vue3-realworld-example-app/actions?query=branch%3Amaster)
[![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/mutoe/vue3-realworld-example-app/Test/script-setup?label=script-setup&logo=github&style=for-the-badge)](https://github.com/mutoe/vue3-realworld-example-app/actions?query=branch%3Ascript-setup)

[![Codecov branch](https://img.shields.io/codecov/c/github/mutoe/vue3-realworld-example-app/master?label=master&logo=codecov&style=flat-square)](https://app.codecov.io/gh/mutoe/vue3-realworld-example-app/branch/master)
[![Codecov branch](https://img.shields.io/codecov/c/github/mutoe/vue3-realworld-example-app/script-setup?label=script-setup&logo=codecov&style=flat-square)](https://app.codecov.io/gh/mutoe/vue3-realworld-example-app/branch/script-setup)

> ### [Vue3](https://v3.vuejs.org/) codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.

- [Demo (master branch)](https://vue3-realworld-example-app-mutoe.vercel.app)
- [Demo (script-setup branch)](https://vue3-realworld-example-app-setup.vercel.app)
- [RealWorld](https://github.com/gothinkster/realworld)


This codebase was created to demonstrate a fully fledged fullstack application built with **Vue3** including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the **Vue3** community styleguides & best practices.

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.

# What works?

- [x] [Vite](https://github.com/vitejs/vite)
- [x] [Composition API](https://composition-api.vuejs.org/)
- [x] [Suspense](https://v3.vuejs.org/guide/component-dynamic-async.html#using-with-suspense) (Experimental)
- [x] [TypeScript](https://www.typescriptlang.org/)
- [x] [ESLint](https://eslint.vuejs.org/)
- [x] [Vue router](https://next.router.vuejs.org/)
- [x] [Harlem](https://github.com/andrewcourtice/harlem) ([await Vuex v5](https://github.com/mutoe/vue3-realworld-example-app/issues/15))
- [x] Unit test ([Vue Test Utils](https://github.com/vuejs/vue-test-utils-next))
- [x] E2E test ([Cypress](https://docs.cypress.io))
- [x] [Vue tsc](https://github.com/johnsoncodehk/vue-tsc)

#### What works in [script-setup branch](https://github.com/mutoe/vue3-realworld-example-app/tree/script-setup) (based on the master branch)

- [x] [Script setup sugar](https://github.com/vuejs/rfcs/blob/sfc-improvements/active-rfcs/0000-sfc-script-setup.md)
- [x] [Script ref sugar](https://github.com/vuejs/rfcs/blob/ref-sugar/active-rfcs/0000-ref-sugar.md)
- [x] Unit test ([Vue Testing Library](https://testing-library.com/docs/vue-testing-library/intro))

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
