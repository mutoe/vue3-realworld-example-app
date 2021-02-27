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

<script lang="ts">
import { defineComponent } from 'vue'
import { useTags } from 'src/composable/useTags'

export default defineComponent({
  name: 'PopularTags',
  async setup () {
    const { tags, fetchTags } = useTags()

    await fetchTags()

    return {
      tags,
    }
  },
})
</script>
