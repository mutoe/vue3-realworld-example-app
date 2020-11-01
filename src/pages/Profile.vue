<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <div
              v-if="!profile.username"
              class="align-left"
            >
              Profile is downloading...
            </div>
            <template v-else>
              <img
                :src="profile.image"
                class="user-img"
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
            <template #default>
              <Articles
                use-author
                use-favorited
              />
            </template>
            <template #fallback>
              Articles are downloading...
            </template>
          </Suspense>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'

import Articles from '../components/Articles/index.vue'

import { useProfile } from '../composable/useProfile'
import { useFollow } from '../composable/useFollowProfile'

import store from '../store'

export default defineComponent({
  name: 'Profile',
  components: {
    Articles,
  },
  setup () {
    const route = useRoute()
    const username = computed<string>(() => route.params.username as string)

    const { user, isAuthorized } = store.user

    const { profile, updateProfile } = useProfile({ username })

    const { followProcessGoing, toggleFollow } = useFollow({
      following: computed<boolean>(() => profile.following),
      username,
      onUpdate: (newProfileData: Profile) => updateProfile(newProfileData),
    })

    const showEdit = computed<boolean>(() => isAuthorized(user) && user.value.username === username.value)
    const showFollow = computed<boolean>(() => user.value?.username !== username.value)

    return {
      profile,
      showEdit,
      showFollow,
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
.align-left {
  text-align: left
}
</style>
