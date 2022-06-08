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

interface Props {
  name: AppRouteNames,
  params?: Partial<RouteParams>,
}

const props = withDefaults(defineProps<Props>(), {
  params: () => ({}),
})
</script>
