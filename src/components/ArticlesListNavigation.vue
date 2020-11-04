<template>
  <div class="articles-toggle">
    <ul class="nav nav-pills outline-active">
      <li
        v-for="link in links"
        :key="link.name"
        class="nav-item"
      >
        <AppLink
          class="nav-link"
          active-class="active"
          :name="link.routeName"
          :params="link.routeParams"
        >
          <i
            v-if="link.icon"
            :class="link.icon"
          /> {{ link.title }}
        </AppLink>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import type { RouteParams } from 'vue-router'
import type { AppRouteNames } from '../router'

import { useArticlesMeta, ArticlesType } from '../composable/useArticlesMeta'

import store from '../store'

interface ArticlesListNavLink {
  name: ArticlesType
  routeName: AppRouteNames
  routeParams?: Partial<RouteParams>
  title: string
  icon?: string
}

export default defineComponent({
  name: 'ArticlesListNavigation',
  props: {
    useGlobalFeed: { type: Boolean, default: false },
    useMyFeed: { type: Boolean, default: false },
    useTagFeed: { type: Boolean, default: false },
    useUserFeed: { type: Boolean, default: false },
    useUserFavorited: { type: Boolean, default: false },
  },
  setup (props) {
    const { user, isAuthorized } = store.user

    const { tag, username } = useArticlesMeta()

    const allLinks = computed<ArticlesListNavLink[]>(() => [
      {
        name: 'global-feed',
        routeName: 'global-feed',
        title: 'Global Feed',
      },
      {
        name: 'my-feed',
        routeName: 'my-feed',
        title: 'Your Feed',
      },
      {
        name: 'tag-feed',
        routeName: 'tag',
        routeParams: { tag: tag.value },
        title: tag.value,
        icon: 'ion-pound',
      },

      {
        name: 'user-feed',
        routeName: 'profile',
        routeParams: { username: username.value },
        title: 'My articles',
      },
      {
        name: 'user-favorites-feed',
        routeName: 'profile-favorites',
        routeParams: { username: username.value },
        title: 'Favorited Articles',
      },
    ])

    const show = computed<Record<ArticlesType, boolean>>(() => ({
      'global-feed': props.useGlobalFeed,
      'my-feed': props.useMyFeed && isAuthorized(user),
      'tag-feed': props.useTagFeed && tag.value !== '',
      'user-feed': props.useUserFeed && username.value !== '',
      'user-favorites-feed': props.useUserFavorited && username.value !== '',
    }))

    const links = computed<ArticlesListNavLink[]>(() => allLinks.value.filter(link => show.value[link.name]))

    return {
      links,
    }
  },
})
</script>
