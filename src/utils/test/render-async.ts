/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * WARNING 01-12-2021: Vue testing library doesn't support <Suspense> see:
 * https://github.com/testing-library/vue-testing-library/issues/230
 *
 * The code below is copied from vue testing library
 * and modified to support <Suspense>:
 * https://github.com/testing-library/vue-testing-library/blob/main/src/render.js
 */

import { mount, flushPromises, VueWrapper } from '@vue/test-utils'
import { h, defineComponent, Suspense } from 'vue'

import { getQueriesForElement, prettyDOM, RenderOptions, RenderResult } from '@testing-library/vue'

const mountedWrappers = new Set<VueWrapper<any>>()

async function renderAsync (
  Component: any,
  {
    store = null,
    routes = null,
    container: customContainer,
    baseElement: customBaseElement,
    ...mountOptions
  }: RenderOptions = {},
): Promise<RenderResult> {
  const div = document.createElement('div')
  const baseElement = customBaseElement || customContainer || document.body
  const container = customContainer || baseElement.appendChild(div)

  if (store || routes) {
    console.warn(`Providing 'store' or 'routes' options is no longer available.
You need to create a router/vuex instance and provide it through 'global.plugins'.
Check out the test examples on GitHub for further details.`)
  }

  const { props, slots, ...restMountingOptions } = mountOptions
  const wrapper = mount(
    defineComponent({
      render () {
        return h(Suspense, null, {
          default: h(Component, props, slots),
        })
      },
    }),
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    {
      attachTo: container,
      ...restMountingOptions,
    } as RenderOptions,
  )

  await flushPromises()

  // this removes the additional "data-v-app" div node from VTU:
  // https://github.com/vuejs/vue-test-utils-next/blob/master/src/mount.ts#L196-L213
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  unwrapNode(wrapper.parentElement)

  mountedWrappers.add(wrapper)

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return {
    container,
    baseElement,
    debug: (el = baseElement, maxLength, options: any) =>
      Array.isArray(el)
        ? el.forEach((e) =>
          console.log(prettyDOM(e as Element, maxLength, options)),
        )
        : console.log(prettyDOM(el as Element, maxLength, options)),
    unmount: () => wrapper.unmount(),
    html: () => wrapper.html(),
    emitted: () => wrapper.emitted(),
    rerender: (props: Record<string, unknown>) => wrapper.setProps(props),
    ...getQueriesForElement(baseElement as HTMLElement),
  } as RenderResult
}

function unwrapNode (node: HTMLElement) {
  node.replaceWith(...node.childNodes)
}

function cleanup () {
  mountedWrappers.forEach(cleanupAtWrapper)
}

function cleanupAtWrapper (wrapper: VueWrapper<any>) {
  if (
    wrapper.element.parentNode &&
    wrapper.element.parentNode.parentNode === document.body
  ) {
    document.body.removeChild(wrapper.element.parentNode)
  }

  wrapper.unmount()
  mountedWrappers.delete(wrapper)
}

afterEach(() => {
  cleanup()
})

export { renderAsync }
