<template>
  <div class="article-preview card">

    <AppLink
      name="article"
      :params="{ slug: props.article.slug }"
      class="cover-link"
      aria-label="Open article"
    >
      <img
        class="cover"
        :src="coverUrl"
        alt="Article cover"
        loading="lazy"
        decoding="async"
        @error="onCoverError"
      />
    </AppLink>

    <div class="article-meta">
      <AppLink
        name="profile"
        :params="{ username: props.article.author.username }"
        class="author-link"
        :aria-label="`Go to ${props.article.author.username} profile`"
      >
        <img
          class="avatar"
          :src="authorAvatar"
          :alt="props.article.author.username"
          loading="lazy"
          decoding="async"
          referrerpolicy="no-referrer"
          @error="onAvatarError"
        />
      </AppLink>

      <div class="info">
        <AppLink
          name="profile"
          :params="{ username: props.article.author.username }"
          class="author"
        >
          {{ article.author.username }}
        </AppLink>
        <span class="date">{{ new Date(article.createdAt).toDateString() }}</span>
      </div>

      <button
        :aria-label="article.favorited ? 'Unfavorite article' : 'Favorite article'"
        class="btn btn-sm pull-xs-right"
        :class="[article.favorited ? 'btn-primary' : 'btn-outline-primary']"
        :disabled="favoriteProcessGoing"
        @click="favoriteArticle"
        title="Favorite"
      >
        <i class="ion-heart" /> {{ article.favoritesCount }}
      </button>
    </div>

    <AppLink
      name="article"
      :params="{ slug: props.article.slug }"
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

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { storeToRefs } from 'pinia'
import { useFavoriteArticle } from 'src/composable/useFavoriteArticle'
import type { Article } from 'src/services/api'
import { useUserStore } from 'src/store/user'

interface Props { article: Article }
interface Emits { (e: 'update', article: Article): void }

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const { article } = toRefs(props)

const { user, isAuthorized } = storeToRefs(useUserStore())



function avatarUrl(username?: string | null, image?: string | null) {
  if (image && image.trim() !== '') return image
  const seed = encodeURIComponent(username || 'U')
  return `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&fontWeight=700&backgroundType=gradientLinear`
}

const authorAvatar = computed(() =>
  avatarUrl(article.value.author.username, article.value.author.image)
)


const coverUrl = computed(
  () => `https://picsum.photos/seed/${encodeURIComponent(article.value.slug)}/640/360`
)

function onAvatarError(e: Event) {
  ;(e.target as HTMLImageElement).src = avatarUrl(article.value.author.username, '')
}
function onCoverError(e: Event) {
  ;(e.target as HTMLImageElement).src = `https://picsum.photos/seed/${Date.now()}/640/360`
}


const { favoriteProcessGoing, favoriteArticle } = useFavoriteArticle({
  isFavorited: computed(() => article.value.favorited),
  articleSlug: computed(() => article.value.slug),
  onUpdate: (newArticle: Article) => emit('update', newArticle),
})
</script>

<style scoped>
.card {
  border: 1px solid #eef2f7;
  border-radius: 14px;
  background: #fff;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(0,0,0,.04);
}


.cover-link { display: block; }
.cover {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  display: block;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
}
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #f3f4f6;
}
.info .author { font-weight: 600; }
.info .date { font-size: .82rem; color: #6b7280; }


.preview-link {
  display: block;
  padding: 12px;
  color: inherit;
  text-decoration: none;
}
.preview-link h1 {
  font-size: 1.3rem;
  margin: 0 0 6px;
}
.preview-link p {
  margin: 0 0 8px;
  color: #374151;
}
.tag-list { margin-top: 8px; }


.card:hover .cover { filter: brightness(0.98); }
</style>
