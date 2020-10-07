<template>
  <p>Popular Tags</p>

  <div class="tag-list">
    <RouterLink
      v-for="tag in tags"
      :key="tag"
      :to="`/tag/${tag}`"
      class="tag-pill tag-default"
    >
      {{ tag }}
    </RouterLink>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useTags } from '../services/tag/getTags'

export default defineComponent({
  name: 'PopularTags',
  setup () {
    const { tags } = useTags()

    return {
      tags,
    }
  },
})
</script>
