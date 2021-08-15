<template>
  <router-link
    :aria-label="props.name"
    :to="props"
    v-bind="attrs"
  >
    <slot />
  </router-link>
</template>

<script lang="ts" setup>
import type { AppRouteNames } from 'src/router'
import { RouterLink } from 'vue-router'
import type { RouteParams } from 'vue-router'
import { useAttrs } from 'vue'

const props = defineProps<{
  name: AppRouteNames
  params?: RouteParams
}>()

const attrs = useAttrs()
</script>
