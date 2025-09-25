<template>
  <p>Popular Tags</p>

  <div class="tag-list">
    <AppLink
      v-for="tag in tags"
      :key="tag"
      class="tag-pill tag-default"
      :aria-label="tag"
      name="tag"
      :params="{ tag }"
    >
      {{ tag }}
    </AppLink>
  </div>
</template>

<script setup lang="ts">
import { useTags } from 'src/composable/use-tags'

const { tags, fetchTags } = useTags()

await fetchTags()
</script>
