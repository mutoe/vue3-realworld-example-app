<template>
  <div class="article-meta">
    <a href=""><img :src="article.author?.image"></a>

    <div class="info">
      <AppLink
        name="profile"
        :params="{username: article.author?.username}"
        class="author"
      >
        {{ article.author?.username }}
      </AppLink>

      <span class="date">{{ (new Date(article.createdAt)).toLocaleDateString() }}</span>
    </div>

    <button class="btn btn-sm btn-outline-secondary space">
      <i class="ion-plus-round space" />
      Follow {{ article.author?.username }}
    </button>

    <button class="btn btn-sm btn-outline-primary space">
      <i class="ion-heart space" />
      {{ article.favorited ? 'Unfavorite' : 'Favorite' }} Article
      <span class="counter">({{ article.favoritesCount }})</span>
    </button>

    <AppLink
      class="btn btn-outline-secondary btn-sm space"
      name="editor"
      :params="{slug: article.slug}"
    >
      <i class="ion-edit space" /> Edit Article
    </AppLink>

    <button class="btn btn-outline-danger btn-sm">
      <i class="ion-trash-a" /> Delete Article
    </button>
    //
    <button
      class="btn btn-outline-danger btn-sm disabled"
      disabled
    >
      <i class="ion-trash-a" /> Delete Article
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'ArticleMeta',
  props: {
    article: { type: Object as PropType<Article>, required: true },
  },
})
</script>

<style scoped>
.space {
  margin-right: 8px;
}
</style>
