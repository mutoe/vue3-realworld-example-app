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

<script lang="ts" setup>
import { useTags } from 'src/composable/useTags'
import { onMounted } from 'vue'

const { tags, fetchTags } = useTags()

onMounted(async () => {
  await fetchTags()
})
</script>
