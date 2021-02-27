<template>
  <router-link
    :aria-label="props.name"
    :to="props"
    v-bind="attrs"
  >
    <slot />
  </router-link>
</template>

<script lang="ts">
import type { AppRouteNames } from 'src/router'
import { defineComponent, PropType } from 'vue'
import type { RouteParams } from 'vue-router'
import { RouterLink } from 'vue-router'

export default defineComponent({
  name: 'AppLink',
  components: {
    RouterLink,
  },
  props: {
    name: { type: String as PropType<AppRouteNames>, required: true },
    params: { type: Object as PropType<RouteParams>, default: () => ({}) },
  },
  setup (props, { attrs }) {
    return {
      props,
      attrs,
    }
  },
})

</script>
