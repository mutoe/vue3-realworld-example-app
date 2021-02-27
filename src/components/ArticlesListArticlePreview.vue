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

      <button
        :aria-label="article.favorited ? 'Unfavorite article' : 'Favorite article'"
        class="btn btn-sm pull-xs-right"
        :class="[article.favorited ? 'btn-primary':'btn-outline-primary']"
        :disabled="favoriteProcessGoing"
        @click="() =>favoriteArticle()"
      >
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
      <ul class="tag-list">
        <li
          v-for="tag in article.tagList"
          :key="tag"
          class="tag-default tag-pill tag-outline"
        >
          {{ tag }}
        </li>
      </ul>
    </AppLink>
  </div>
</template>

<script lang="ts">
import { useFavoriteArticle } from 'src/composable/useFavoriteArticle'
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'ArticlesListArticlePreview',
  props: {
    article: {
      type: Object as PropType<Article>,
      required: true,
    },
  },
  emits: {
    update: (article: Article) => !!article.slug,
  },
  setup (props, { emit }) {
    const {
      favoriteProcessGoing,
      favoriteArticle,
    } = useFavoriteArticle({
      isFavorited: computed(() => props.article.favorited),
      articleSlug: computed(() => props.article.slug),
      onUpdate: (newArticle: Article): void => emit('update', newArticle),
    })

    return {
      favoriteProcessGoing,
      favoriteArticle,
    }
  },
})
</script>
