<template>
  <div class="popular-tags">
    <p class="popular-tags-title">
      Popular Tags
    </p>

    <div class="tag-list">
      <AppLink
        v-for="tag in tags"
        :key="tag"
        name="tag"
        :params="{ tag }"
        class="tag-pill tag-default"
      >
        {{ tag }}
      </AppLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTags } from 'src/composable/useTags'
const { tags, fetchTags } = useTags()

await fetchTags()
</script>

<style scoped>
.popular-tags {
  text-align: center;
  background-color: #5CB85C;
}

.popular-tags-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-pill {
  display: inline-block;
  padding: 5px 10px;
  background-color: #fff;
  border-radius: 20px;
  color: #000 !important;
  text-decoration: none;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}

.tag-pill:hover {
  background-color: #333;
  color: #fff !important;
}
</style>
