# ![RealWorld Example App](logo.png)

[![Codecov branch](https://img.shields.io/codecov/c/github/mutoe/vue3-realworld-example-app/master?logo=codecov&style=for-the-badge)](https://app.codecov.io/gh/mutoe/vue3-realworld-example-app/branch/master)
[![GitHub Workflow Status (branch)](https://img.shields.io/github/actions/workflow/status/mutoe/vue3-realworld-example-app/test.yml?logo=github&style=for-the-badge)](https://github.com/mutoe/vue3-realworld-example-app/actions?query=branch%3Amaster)
[![code style](https://img.shields.io/badge/Code_Style-Anthony_Fu-333?style=for-the-badge&logo=eslint)](https://github.com/anthony/eslint-config)

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
- [x] [Pinia](https://pinia.vuejs.org/) for state management
- [x] [TypeScript](https://www.typescriptlang.org/) and [Vue tsc](https://github.com/johnsoncodehk/volar/tree/master/vue-language-tools/vue-tsc) for static analysis
- [x] [swagger-typescript-api](https://github.com/acacode/swagger-typescript-api) for auto generate interface from swagger
- [x] [ESLint](https://eslint.vuejs.org/) and [@mutoe/eslint-config](https://github.com/mutoe/eslint-config) for linting and styling (based on [@anthony/eslint-config](https://github.com/anthony/eslint-config))
- [x] [Vitest](https://vitest.dev/) for unit testing
- [x] [Testing Library](https://testing-library.com/docs/vue-testing-library/intro/) for component testing
- [x] [Cypress](https://docs.cypress.io) for E2E testing
- [x] [GitHub Actions](https://docs.github.com/en/actions) CI/CD

> Basically, some of they are necessary features for the development of medium to large projects, and you can also use this repository as a starter.
>
> Enjoy it! 😄

# Getting started

```shell script
pnpm install

# Development
pnpm dev

# Build dist
pnpm build

# Run unit tests
pnpm test:unit
pnpm test:unit:ci

# Run E2E tests
pnpm test:e2e
pnpm test:e2e:ci
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
