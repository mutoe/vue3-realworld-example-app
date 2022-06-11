<template>
  <RouterLink
    :aria-label="props.name"
    :to="props"
  >
    <slot />
  </RouterLink>
</template>

<script setup lang="ts">
import type { AppRouteNames } from 'src/router'
import type { RouteParams } from 'vue-router'

export interface AppLinkProps {
  name: AppRouteNames
  params?: Partial<RouteParams>
}

const props = withDefaults(defineProps<AppLinkProps>(), {
  params: () => ({}),
})
</script>
