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
import type { StyleOptions } from '@cypress/mount-utils'
import type { MountingOptions } from '@vue/test-utils'
import { mount } from 'cypress/vue'
import registerGlobalComponents from 'src/plugins/global-components'
import { routes } from 'src/router'
import type {
  ComponentOptionsWithArrayProps, ComponentOptionsWithObjectProps,
  ComponentOptionsWithoutProps, ComponentPropsOptions, FunctionalComponent,
  DefineComponent, ExtractDefaultPropTypes, MethodOptions,
  AllowedComponentProps, ComponentCustomProps, VNodeProps,
  ComponentOptionsMixin, ComputedOptions, EmitsOptions, ExtractPropTypes, App,
} from 'vue'
import type { Router } from 'vue-router'
import { createMemoryHistory, createRouter } from 'vue-router'

type PublicProps = VNodeProps & AllowedComponentProps & ComponentCustomProps
type RouterOptions = { router?: Router }

export declare type CyMountOptions<Props, Data = {}> =
  & Omit<MountingOptions<Props, Data>, 'attachTo'>
  & { log?: boolean }
  & Partial<StyleOptions>
  & RouterOptions

interface Mount {
  <V>(originalComponent: {
    new(...args: any[]): V
    registerHooks(keys: string[]): void
  }, options?: MountingOptions<any>): Cypress.Chainable

  <V, P>(originalComponent: {
    new(...args: any[]): V
    props(Props: P): any
    registerHooks(keys: string[]): void
  }, options?: CyMountOptions<P & PublicProps>): Cypress.Chainable

  <Props, E extends EmitsOptions = {}>(originalComponent: FunctionalComponent<Props, E>, options?: CyMountOptions<Props & PublicProps>): Cypress.Chainable

  <PropsOrPropOptions = {}, RawBindings = {}, D = {}, C extends ComputedOptions = ComputedOptions, M extends MethodOptions = MethodOptions, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = ComponentOptionsMixin, E extends EmitsOptions = Record<string, any>, EE extends string = string, PP = PublicProps, Props = Readonly<ExtractPropTypes<PropsOrPropOptions>>, Defaults = ExtractDefaultPropTypes<PropsOrPropOptions>>(component: DefineComponent<PropsOrPropOptions, RawBindings, D, C, M, Mixin, Extends, E, EE, PP, Props, Defaults>, options?: CyMountOptions<Partial<Defaults> & Omit<Props & PublicProps, keyof Defaults>, D>): Cypress.Chainable

  <Props = {}, RawBindings = {}, D = {}>(componentOptions: ComponentOptionsWithoutProps<Props, RawBindings, D>, options?: CyMountOptions<Props & PublicProps, D>): Cypress.Chainable

  <PropNames extends string, RawBindings, D, C extends ComputedOptions = {}, M extends Record<string, Function> = {}, E extends EmitsOptions = Record<string, any>, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = ComponentOptionsMixin, EE extends string = string, Props extends Readonly<{ [key in PropNames]?: any; }> = Readonly<{ [key in PropNames]?: any; }>>(componentOptions: ComponentOptionsWithArrayProps<PropNames, RawBindings, D, C, M, E, Mixin, Extends, EE, Props>, options?: CyMountOptions<Props & PublicProps, D>): Cypress.Chainable

  <PropsOptions extends Readonly<ComponentPropsOptions>, RawBindings, D, C extends ComputedOptions = {}, M extends Record<string, Function> = {}, E extends EmitsOptions = Record<string, any>, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = ComponentOptionsMixin, EE extends string = string>(componentOptions: ComponentOptionsWithObjectProps<PropsOptions, RawBindings, D, C, M, E, Mixin, Extends, EE>, options?: CyMountOptions<ExtractPropTypes<PropsOptions> & PublicProps, D>): Cypress.Chainable
}

type MountParams = Parameters<Mount>

declare global {
  namespace Cypress {
    // noinspection JSUnusedGlobalSymbols
    interface Chainable {
      mount: Mount
    }
  }
}

Cypress.Commands.add('mount', (component: MountParams[0], options: MountParams[1] = {}) => {
  options.global = options.global || {}
  options.global.plugins = options.global.plugins || []

  if (!options.router) {
    options.router = createRouter({
      routes,
      history: createMemoryHistory(),
    })
  }

  options.global.plugins.push({
    install (app: App) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      app.use(options.router!)
    },
  },
  {
    install (app: App) {
      registerGlobalComponents(app)
    },
  })

  return mount(component as any, options)
})
