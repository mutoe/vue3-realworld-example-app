<template>
  <div class="article-meta">
    <a href=""><img :src="article.author?.image"></a>

    <div class="info">
      <RouterLink
        :to="`/@${article.author?.username}`"
        class="author"
      >
        {{ article.author?.username }}
      </RouterLink>

      <span class="date">{{ (new Date(article.createdAt)).toLocaleDateString() }}</span>
    </div>

    <button class="btn btn-sm btn-outline-secondary">
      <i class="ion-plus-round" />
      &nbsp;
      Follow {{ article.author?.username }}
    </button>

    &nbsp;&nbsp;

    <button class="btn btn-sm btn-outline-primary">
      <i class="ion-heart" />
            &nbsp;
      {{ article.favorited ? "Unfavorite" : "Favorite" }} Article
      <span class="counter">({{ article.favoritesCount }})</span>
    </button>

    &nbsp;&nbsp;

    <RouterLink
      class="btn btn-outline-secondary btn-sm"
      :to="`/editor/${article.slug}`"
    >
      <i class="ion-edit" /> Edit Article
    </RouterLink>

    &nbsp;&nbsp;

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
