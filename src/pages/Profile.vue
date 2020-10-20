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
              v-if="isUserAuthorized"
              class="btn btn-sm btn-outline-secondary action-btn"
              name="settings"
            >
              <i class="ion-gear-a space" />
              Edit profile settings
            </AppLink>
            <button
              v-else
              class="btn btn-sm btn-outline-secondary action-btn"
            >
              <i class="ion-plus-round space" />
              {{ profile.following ? 'Unfollow' : 'Follow' }} {{ profile.username }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <AppLink
                  class="nav-link"
                  :class="{active: routeName === 'profile'}"
                  name="profile"
                  :params="{ username }"
                >
                  My Articles
                </AppLink>
              </li>
              <li class="nav-item">
                <AppLink
                  class="nav-link"
                  :class="{active: routeName === 'profile-favorites'}"
                  name="profile-favorites"
                  :params="{ username }"
                >
                  Favorited Articles
                </AppLink>
              </li>
            </ul>
          </div>

          <ArticlePreview
            v-for="article in articles"
            :key="article.slug"
            :article="article"
          />

          <Pagination
            :count="articlesCount"
            :page="page"
          />
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
import Pagination from '../components/Pagination.vue'
import { useFavoritedArticles } from '../services/article/getFavoritedArticles'
import { useProfileArticles } from '../services/article/getProfileArticles'
import { useProfile } from '../services/profile/getProfile'

export default defineComponent({
  name: 'Profile',
  components: {
    ArticlePreview,
    Pagination,
  },
  setup () {
    const store = useStore()
    const route = useRoute()

    const username = computed<string>(() => route.params.username as string)
    const { profile } = useProfile(username.value)

    // FIXME: Here no request is triggered when the type changes
    const fetcher = route.name === 'profile' ? useProfileArticles : useFavoritedArticles
    const { articles, articlesCount, page } = fetcher(username.value)

    return {
      username,
      profile,
      articles,
      articlesCount,
      page,
      isUserAuthorized: computed(() => store.state.user !== null),
      routeName: computed(() => route.name),
    }
  },
})

</script>

<style scoped>
.space {
  margin-right: 4px;
}
</style>
