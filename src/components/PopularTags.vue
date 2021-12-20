<template>
  <p>Popular Tags</p>

  <div class="tag-list">
    <AppLink
      v-for="tag in tags"
      :key="tag"
      name="tag"
      :params="{tag}"
      class="tag-pill tag-default"
    >
      {{ tag }}
    </AppLink>
  </div>
</template>

<script setup lang="ts">
import { useTags } from 'src/composable/useTags'
const { tags, fetchTags } = useTags()

await fetchTags()
</script>
