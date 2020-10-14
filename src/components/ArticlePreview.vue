<template>
  <div class="article-preview">
    <div class="article-meta">
      <AppLink
        name="profile"
        :params="{username: article.author.username}"
      >
        <img :src="article.author.image">
      </AppLink>
      <div class="info">
        <AppLink
          name="profile"
          :params="{username: article.author.username}"
          class="author"
        >
          {{ article.author.username }}
        </AppLink>
        <span class="date">{{ new Date(article.createdAt).toDateString() }}</span>
      </div>
      <button class="btn btn-outline-primary btn-sm pull-xs-right">
        <i class="ion-heart" /> {{ article.favoritesCount }}
      </button>
    </div>
    <AppLink
      name="article"
      :params="{slug: article.slug}"
      class="preview-link"
    >
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
    </AppLink>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'ArticlePreview',
  props: {
    article: { type: Object as PropType<Article>, required: true },
  },
})
</script>
