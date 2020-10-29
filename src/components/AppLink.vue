<template>
  <router-link
    :to="to"
    v-bind="attrs"
  >
    <slot />
  </router-link>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type { RouteParams } from 'vue-router'
import type { AppRouteNames } from '../router'

export default defineComponent({
  name: 'AppLink',
  props: {
    name: { type: String as PropType<AppRouteNames>, required: true },
    params: { type: Object as PropType<RouteParams>, default: () => ({}) },
  },
  setup (props, { attrs }) {
    return {
      to: props,
      attrs,
    }
  },
})

</script>
