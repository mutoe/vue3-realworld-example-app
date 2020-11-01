<template>
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

      <span class="date">{{ (new Date(article.createdAt)).toLocaleDateString() }}</span>
    </div>

    <button
      v-if="displayFollowButton"
      class="btn btn-sm btn-outline-secondary space"
      :disabled="followProcessGoing"
      @click="toggleFollow"
    >
      <i class="ion-plus-round space" />
      {{ article.author.following ? "Unfollow" : "Follow" }} {{ article.author.username }}
    </button>

    <button
      class="btn btn-sm space"
      :class="[article.favorited ? 'btn-primary':'btn-outline-primary']"
      :disabled="favoriteProcessGoing"
      @click="favoriteArticle"
    >
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
import { computed, defineComponent, PropType, toRefs } from 'vue'

import { deleteArticle } from '../../services/article/deleteArticle'

import { useFavoriteArticle } from '../../composable/useFavoriteArticle'
import { useFollow } from '../../composable/useFollowProfile'

import store from '../../store'
import { routerPush } from '../../router'

export default defineComponent({
  name: 'ArticleMeta',
  props: {
    article: { type: Object as PropType<Article>, required: true },
  },
  emits: {
    update: (article: Article) => !!article.slug,
  },
  setup (props, { emit }) {
    const { user, isAuthorized } = store.user

    const { article } = toRefs(props)
    const displayEditButton = computed(() => isAuthorized(user) && user.value.username === article.value.author.username)
    const displayFollowButton = computed(() => user.value?.username !== article.value.author.username)

    const { favoriteProcessGoing, favoriteArticle } = useFavoriteArticle({
      isFavorited: computed(() => article.value.favorited),
      articleSlug: computed(() => article.value.slug),
      onUpdate: newArticle => emit('update', newArticle),
    })

    const onDelete = async () => {
      await deleteArticle(article.value.slug)
      await routerPush('global-feed')
    }

    const { followProcessGoing, toggleFollow } = useFollow({
      following: computed(() => article.value.author.following),
      username: computed(() => article.value.author.username),
      onUpdate: (author: Profile) => {
        const newArticle = { ...article.value, author }
        emit('update', newArticle)
      },
    })

    return {
      displayEditButton,
      displayFollowButton,
      onDelete,
      favoriteProcessGoing,
      favoriteArticle,
      followProcessGoing,
      toggleFollow,
    }
  },
})
</script>

<style scoped>
.space {
  margin-right: 8px;
}
</style>
