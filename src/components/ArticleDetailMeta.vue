<template>
  <section class="meta-card" role="region" aria-label="Article header actions">

    <div class="author-side">
      <AppLink
        class="avatar-link"
        name="profile"
        :params="{ username: article.author.username }"
        :aria-label="`Go to ${article.author.username} profile`"
      >
        <img
          class="avatar"
          :src="article.author.image || defaultAvatar"
          :alt="article.author.username"
        />
      </AppLink>

      <div class="author-info">
        <div class="author-row">
          <AppLink
            class="author-name"
            name="profile"
            :params="{ username: article.author.username }"
          >
            {{ article.author.username }}
          </AppLink>

          <span
            v-if="isOwner"
            class="badge badge-owner"
            title="You are the author"
          >
            Owner
          </span>
          <span
            v-else
            class="badge"
            :class="article.author.following ? 'badge-following' : 'badge-neutral'"
            :title="article.author.following ? 'You follow this author' : 'You are not following this author'"
          >
            {{ article.author.following ? 'Following' : 'Reader' }}
          </span>
        </div>

        <div class="time-row">
          <time
            class="timechip"
            :datetime="article.createdAt"
            :title="formatFullDate(article.createdAt)"
          >
            <i class="ion-compose mr-6" aria-hidden="true" /> Created
            {{ formatShortDate(article.createdAt) }}
            <span class="muted"> ({{ relative(article.createdAt) }})</span>
          </time>

          <span class="dot" aria-hidden="true">•</span>

          <time
            class="timechip"
            :datetime="article.updatedAt"
            :title="formatFullDate(article.updatedAt)"
          >
            <i class="ion-loop mr-6" aria-hidden="true" /> Updated
            {{ formatShortDate(article.updatedAt) }}
            <span class="muted"> ({{ relative(article.updatedAt) }})</span>
          </time>
        </div>
      </div>
    </div>

 
    <div class="actions">
   
      <button
        :aria-label="article.favorited ? 'Unfavorite article' : 'Favorite article'"
        class="btn btn-sm"
        :class="[article.favorited ? 'btn-primary' : 'btn-outline-primary']"
        :disabled="favoriteProcessGoing"
        @click="favoriteArticle"
        title="Love this post"
      >
        <i class="ion-heart mr-6" />
        {{ article.favorited ? 'Unfavorite' : 'Favorite' }}
        <span class="counter">({{ article.favoritesCount }})</span>
      </button>


      <button
        v-if="displayFollowButton"
        :aria-label="article.author.following ? 'Unfollow' : 'Follow'"
        class="btn btn-sm btn-outline-secondary"
        :disabled="followProcessGoing"
        @click="toggleFollow"
        title="Follow author"
      >
        <i class="ion-plus-round mr-6" />
        {{ article.author.following ? "Unfollow" : "Follow" }}
      </button>


      <AppLink
        v-if="displayEditButton"
        aria-label="Edit article"
        class="btn btn-outline-secondary btn-sm"
        name="edit-article"
        :params="{ slug: article.slug }"
        title="Edit this article"
      >
        <i class="ion-edit mr-6" /> Edit
      </AppLink>

      <button
        v-if="displayEditButton"
        aria-label="Delete article"
        class="btn btn-outline-danger btn-sm"
        @click="onDelete"
        title="Delete this article"
      >
        <i class="ion-trash-a mr-6" /> Delete
      </button>


      <button
        v-if="showHistoryLink"
        class="btn btn-outline-secondary btn-sm"
        @click="emit('show-history')"
        aria-label="View article history"
        title="Show revision history"
      >
        <i class="ion-clock mr-6" /> History
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { storeToRefs } from 'pinia'
import { useFavoriteArticle } from 'src/composable/useFavoriteArticle'
import { useFollow } from 'src/composable/useFollowProfile'
import { routerPush } from 'src/router'
import { api } from 'src/services'
import type { Article, Profile } from 'src/services/api'
import { useUserStore } from 'src/store/user'

interface Props { article: Article }
interface Emits {
  (e: 'update', article: Article): void
  (e: 'show-history'): void
}
const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const { article } = toRefs(props)

const defaultAvatar =
  'https://api.dicebear.com/7.x/initials/svg?radius=50&chars=2&bold=1&seed=' +
  encodeURIComponent(article.value.author.username || 'U')

const { user, isAuthorized } = storeToRefs(useUserStore())
const isOwner = computed(() => isAuthorized.value && user.value?.username === article.value.author.username)

const displayEditButton = computed(() => isOwner.value)
const displayFollowButton = computed(() => isAuthorized.value && !isOwner.value)
const showHistoryLink = computed(() => isOwner.value)

const { favoriteProcessGoing, favoriteArticle } = useFavoriteArticle({
  isFavorited: computed(() => article.value.favorited),
  articleSlug: computed(() => article.value.slug),
  onUpdate: newArticle => emit('update', newArticle),
})

async function onDelete() {
  if (!confirm('Delete this article?')) return
  await api.articles.deleteArticle(article.value.slug)
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


function formatShortDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}
function formatFullDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString(undefined, {
    weekday: 'short',
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  })
}
function relative(iso: string): string {
  const now = new Date()
  const then = new Date(iso)
  const sec = Math.round((then.getTime() - now.getTime()) / 1000)
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' })
  const ranges = [
    ['year', 60 * 60 * 24 * 365],
    ['month', 60 * 60 * 24 * 30],
    ['day', 60 * 60 * 24],
    ['hour', 60 * 60],
    ['minute', 60],
    ['second', 1],
  ] as const
  for (const [unit, secondsInUnit] of ranges) {
    if (Math.abs(sec) >= secondsInUnit || unit === 'second') {
      return rtf.format(Math.round(sec / secondsInUnit), unit as Intl.RelativeTimeFormatUnit)
    }
  }
  return ''
}
</script>

<style scoped>

.meta-card{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:16px;
  padding:14px 16px;
  border:1px solid rgba(0,0,0,.06);
  border-radius:14px;
  background:#fff;
  box-shadow: 0 4px 14px rgba(0,0,0,.04);
}

.author-side{
  display:flex;
  align-items:center;
  gap:14px;
  min-width:0;
}

.avatar-link{ display:inline-block; }
.avatar{
  width:48px; height:48px;
  border-radius:50%;
  object-fit:cover;
  border:2px solid #f3f3f3;
  box-shadow:0 2px 8px rgba(0,0,0,.06);
  transition: transform .15s ease, box-shadow .15s ease;
}
.avatar-link:hover .avatar{
  transform: translateY(-1px);
  box-shadow:0 6px 16px rgba(0,0,0,.08);
}

.author-info{ display:flex; flex-direction:column; gap:4px; min-width:0; }
.author-row{ display:flex; align-items:center; gap:8px; min-width:0; }

.author-name{
  font-weight:700;
  color:#111827;
  text-decoration:none;
}
.author-name:hover{ text-decoration:underline; }

.time-row{
  display:flex; align-items:center; gap:8px;
  color:#6b7280;
  flex-wrap:wrap;
}
.dot{ opacity:.5; }

.timechip{
  font-size:.88rem;
  background:#f8fafc;
  color:#475569;
  padding:4px 10px;
  border-radius:999px;
  border:1px solid #eef2f7;
  display:flex; align-items:center; gap:6px;
}
.muted{ opacity:.8; font-size:.82em; }


.actions{
  display:flex; align-items:center; gap:8px;
  flex-wrap:wrap;
}
.btn:focus { outline: 3px solid rgba(59,130,246,.35); outline-offset: 1px; }
.counter { margin-left: 4px; }


.badge{
  font-size:.72rem;
  padding:3px 8px;
  border-radius:999px;
  border:1px solid transparent;
  line-height:1;
}
.badge-owner{
  background:#eef8ff;
  color:#0b66c3;
  border-color:#d7ecff;
}
.badge-following{
  background:#ecfdf5;
  color:#047857;
  border-color:#c6f6d5;
}
.badge-neutral{
  background:#f3f4f6;
  color:#4b5563;
  border-color:#e5e7eb;
}


.mr-6{ margin-right:6px; }


@media (prefers-color-scheme: dark){
  .meta-card{ background:#0f1115; border-color:#1f2937; box-shadow:none; }
  .author-name{ color:#e5e7eb; }
  .timechip{ background:#0b1220; border-color:#1f2937; color:#9ca3af; }
  .badge-neutral{ background:#111827; border-color:#1f2937; color:#9ca3af; }
}


@media (max-width: 640px){
  .meta-card{
    align-items:flex-start;
    flex-direction:column;
    gap:12px;
  }
  .actions{ width:100%; }
}
</style>
