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
      v-if="displayEditButton"
      class="btn btn-outline-secondary btn-sm space"
      name="edit-article"
      :params="{slug: article.slug}"
    >
      <i class="ion-edit space" /> Edit Article
    </AppLink>

    <button
      v-if="displayEditButton"
      class="btn btn-outline-danger btn-sm"
      @click="onDelete"
    >
      <i class="ion-trash-a" /> Delete Article
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { deleteArticle } from '../services/article/deleteArticle'
import { Store } from '../store'

export default defineComponent({
  name: 'ArticleMeta',
  props: {
    article: { type: Object as PropType<Article>, required: true },
  },
  setup (props) {
    const router = useRouter()
    const store = useStore<Store>()
    const user = computed<Store['user']>(() => store.state.user)

    const displayEditButton = computed(() => user.value.username === props.article.author?.username)

    const onDelete = async () => {
      await deleteArticle(props.article.slug)
      return router.push({ name: 'global-feed' })
    }

    return { displayEditButton, onDelete }
  },
})
</script>

<style scoped>
.space {
  margin-right: 8px;
}
</style>
