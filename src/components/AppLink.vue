<template>
  <RouterLink
    :aria-label="props.name"
    :to="props"
  >
    <slot />
  </RouterLink>
</template>

<script setup lang="ts">
import type { RouteParams } from 'vue-router'
import type { AppRouteNames } from 'src/router'

export interface AppLinkProps {
  name: AppRouteNames
  params?: Partial<RouteParams>
}

const props = withDefaults(defineProps<AppLinkProps>(), {
  params: () => ({}),
})
</script>
