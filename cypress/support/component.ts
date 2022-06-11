/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types */
// noinspection ES6PreferShortImport

// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
import './commands'

import type { CyMountOptions } from 'cypress/vue'
import { mount } from 'cypress/vue'
import registerGlobalComponents from 'src/plugins/global-components'
import { routes } from 'src/router'
import type {
  DefineComponent, ExtractDefaultPropTypes, MethodOptions,
  AllowedComponentProps, ComponentCustomProps, VNodeProps,
  ComponentOptionsMixin,
  ComputedOptions,
  EmitsOptions, ExtractPropTypes,
} from 'vue'
import type { Router } from 'vue-router'
import { createMemoryHistory, createRouter } from 'vue-router'

type PublicProps = VNodeProps & AllowedComponentProps & ComponentCustomProps
type RouterOptions = {router?: Router}

type Mount = <PropsOrPropOptions = {}, RawBindings = {}, D = {}, C extends ComputedOptions = ComputedOptions, M extends MethodOptions = MethodOptions, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = ComponentOptionsMixin, E extends EmitsOptions = Record<string, any>, EE extends string = string, PP = PublicProps, Props = Readonly<ExtractPropTypes<PropsOrPropOptions>>, Defaults = ExtractDefaultPropTypes<PropsOrPropOptions>>(
  component: DefineComponent<PropsOrPropOptions, RawBindings, D, C, M, Mixin, Extends, E, EE, PP, Props, Defaults>,
  options?: CyMountOptions<Partial<Defaults> & Omit<Props & PublicProps, keyof Defaults>, D> & RouterOptions,
) => Cypress.Chainable

type MountParams = Parameters<Mount>

declare global {
  namespace Cypress {
    // noinspection JSUnusedGlobalSymbols
    interface Chainable {
      mount: Mount
    }
  }
}

Cypress.Commands.add('mount', (component: any, options: MountParams[1] = {}) => {
  options.global = options.global || {}
  options.global.plugins = options.global.plugins || []

  if (!options.router) {
    options.router = createRouter({
      routes,
      history: createMemoryHistory(),
    })
  }

  options.global.plugins.push({
    install (app) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      app.use(options.router!)
    },
  })

  options.global.plugins.push({
    install (app) {
      registerGlobalComponents(app)
    },
  })

  return mount(component, options)
})
