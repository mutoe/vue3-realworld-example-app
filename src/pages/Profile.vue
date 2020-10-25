<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img
              :src="profile.image"
              class="user-img"
            >
            <h4>{{ profile.username }}</h4>
            <p v-if="profile.bio">
              {{ profile.bio }}
            </p>

            <AppLink
              v-if="isMyProfile"
              class="btn btn-sm btn-outline-secondary action-btn"
              name="settings"
            >
              <i class="ion-gear-a space" />
              Edit profile settings
            </AppLink>
            <button
              v-if="isNotMyProfile"
              class="btn btn-sm btn-outline-secondary action-btn"
              :disabled="followProcessGoing"
              @click="toggleFollow"
            >
              <i class="ion-plus-round space" />
              {{ profile.following ? "Unfollow" : "Follow" }} {{ profile.username }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ArticlesNavigation
              :use-author="username"
              :use-favorited="username"
            />
          </div>

          <div
            v-if="articlesDownloading"
            class="article-preview"
          >
            Articles are downloading...
          </div>
          <template v-else>
            <ArticlePreview
              v-for="(article, index) in articles"
              :key="article.slug"
              :article="article"
              @update="updateArticle(index, $event)"
            />

            <Pagination
              :count="articlesCount"
              :page="page"
              @page-change="changePage"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import ArticlePreview from '../components/ArticlePreview.vue'
import ArticlesNavigation from '../components/ArticlesNavigation.vue'
import Pagination from '../components/Pagination.vue'
import { useProfile } from '../services/profile/getProfile'
import { useFollow } from '../services/profile/followProfile'
import { useArticles } from '../services/article/getArticles'
import { AppRouteNames } from '../routes'

export default defineComponent({
  name: 'Profile',
  components: {
    ArticlePreview,
    ArticlesNavigation,
    Pagination,
  },
  setup () {
    const store = useStore()
    const route = useRoute()

    const routeName = computed<AppRouteNames>(() => route.name as AppRouteNames)
    const username = computed<string>(() => route.params.username as string)
    const user = computed<User>(() => store.state.user)

    const { profile, updateProfile } = useProfile(username.value)
    const { followProcessGoing, toggleFollow: toggleFollowUser } = useFollow({
      following: computed<boolean>(() => profile.following),
      username: username.value,
    })

    const isUserAuthorized = computed<boolean>(() => store.state.user !== null)
    const isMyProfile = computed<boolean>(() => isUserAuthorized.value && user.value.username === username.value)
    const isNotMyProfile = computed<boolean>(() => isUserAuthorized.value && user.value.username !== username.value)

    const { articlesDownloading, articlesCount, articles, page, changePage, updateArticle } = useArticles({
      routeName,
      username,
    })

    async function toggleFollow () {
      const newProfileData = await toggleFollowUser()
      updateProfile(newProfileData)
    }

    return {
      username,
      profile,
      articlesDownloading,
      articles,
      articlesCount,
      page,
      changePage,
      updateArticle,
      isMyProfile,
      isNotMyProfile,
      routeName,
      followProcessGoing,
      toggleFollow,
    }
  },
})

</script>

<style scoped>
.space {
  margin-right: 4px;
}
</style>
