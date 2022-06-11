<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <div
              v-if="!profile"
              class="align-left"
            >
              Profile is downloading...
            </div>
            <template v-else>
              <img
                :src="profile.image"
                class="user-img"
                :alt="profile.username"
              >

              <h4>{{ profile.username }}</h4>

              <p v-if="profile.bio">
                {{ profile.bio }}
              </p>

              <AppLink
                v-if="showEdit"
                class="btn btn-sm btn-outline-secondary action-btn"
                name="settings"
              >
                <i class="ion-gear-a space" />
                Edit profile settings
              </AppLink>

              <button
                v-if="showFollow"
                class="btn btn-sm btn-outline-secondary action-btn"
                :disabled="followProcessGoing"
                @click="toggleFollow"
              >
                <i class="ion-plus-round space" />
                {{ profile.following ? "Unfollow" : "Follow" }} {{ profile.username }}
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <Suspense>
            <ArticlesList
              use-user-feed
              use-user-favorited
            />
            <template #fallback>
              Articles are downloading...
            </template>
          </Suspense>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import ArticlesList from 'src/components/ArticlesList.vue'
import { useFollow } from 'src/composable/useFollowProfile'
import { useProfile } from 'src/composable/useProfile'
import type { Profile } from 'src/services/api'
import { isAuthorized, useUserStore } from 'src/store/user'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const username = computed<string>(() => route.params.username as string)

const { profile, updateProfile } = useProfile({ username })

const { followProcessGoing, toggleFollow } = useFollow({
  following: computed<boolean>(() => profile.value?.following ?? false),
  username,
  onUpdate: (newProfileData: Profile) => updateProfile(newProfileData),
})

const { user } = storeToRefs(useUserStore())

const showEdit = computed<boolean>(() => isAuthorized() && user.value?.username === username.value)
const showFollow = computed<boolean>(() => user.value?.username !== username.value)

</script>

<style scoped>
.space {
  margin-right: 4px;
}
.align-left {
  text-align: left
}
</style>
