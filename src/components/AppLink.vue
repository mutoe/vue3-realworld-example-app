<template>
  <router-link
    :aria-label="props.name"
    :to="props"
    v-bind="attrs"
  >
    <slot />
  </router-link>
</template>

<script setup lang="ts">
import type { AppRouteNames } from 'src/router'
import { useAttrs } from 'vue'
import type { RouteParams } from 'vue-router'
import { RouterLink } from 'vue-router'

interface Props {
  name: AppRouteNames,
  params?: RouteParams
}

const props = withDefaults(defineProps<Props>(), {
  params: () => ({}),
})

const attrs = useAttrs()
</script>
