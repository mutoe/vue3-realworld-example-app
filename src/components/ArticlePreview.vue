<template>
  <div class="article-preview">
    <div class="article-meta">
      <RouterLink :to="`/@${article.author.username}`">
        <img :src="article.author.image">
      </RouterLink>
      <div class="info">
        <RouterLink
          :to="`/@${article.author.username}`"
          class="author"
        >
          {{ article.author.username }}
        </RouterLink>
        <span class="date">{{ new Date(article.createdAt).toDateString() }}</span>
      </div>
      <button class="btn btn-outline-primary btn-sm pull-xs-right">
        <i class="ion-heart" /> {{ article.favoritesCount }}
      </button>
    </div>
    <RouterLink
      :to="`/article/${article.slug}`"
      class="preview-link"
    >
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
    </RouterLink>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'

interface ArticlePreviewProps {
  article: Article,
}

export default defineComponent({
  name: 'ArticlePreview',
  props: ['article'],
  setup (props: ArticlePreviewProps) {
    const { article } = toRefs(props)
    return {
      article,
    }
  },
})
</script>
