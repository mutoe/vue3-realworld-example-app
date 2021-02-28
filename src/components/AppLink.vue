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
import { defineProps, useContext } from 'vue'
import { RouterLink } from 'vue-router'
import type { RouteParams } from 'vue-router'

const props = defineProps<{
  name: AppRouteNames
  params?: RouteParams
}>()

const { attrs } = useContext()
</script>
