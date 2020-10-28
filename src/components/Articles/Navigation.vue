<template>
  <div class="articles-toggle">
    <ul class="nav nav-pills outline-active">
      <li
        v-for="link in links"
        :key="link.type"
        class="nav-item"
      >
        <AppLink
          class="nav-link"
          active-class="active"
          :name="link.name"
          :params="link.params"
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
import { computed, defineComponent, toRefs } from 'vue'
import type { RouteParams } from 'vue-router'
import type { AppRouteNames } from '../../routes'

type ArticleNavLinkType = 'globalFeed' | 'myFeed' | 'tag' | 'author' | 'favorited'

interface ArticleNavLink {
  name: AppRouteNames
  params?: Partial<RouteParams>
  type: ArticleNavLinkType
  title: string
  icon?: string
}

export default defineComponent({
  name: 'ArticlesNavigation',
  props: {
    useGlobalFeed: { type: Boolean, default: false },
    useMyFeed: { type: Boolean, default: false },
    useTag: { type: String, default: '' },
    useAuthor: { type: String, default: '' },
    useFavorited: { type: String, default: '' },
  },
  setup (props) {
    const { useGlobalFeed, useMyFeed, useTag, useAuthor, useFavorited } = toRefs(props)

    const allLinks = computed<ArticleNavLink[]>(() => [
      {
        type: 'globalFeed',
        name: 'global-feed',
        title: 'Global Feed',
      },
      {
        type: 'myFeed',
        name: 'my-feed',
        title: 'Your Feed',
      },
      {
        type: 'tag',
        name: 'tag',
        params: { tag: useTag.value },
        title: useTag.value,
        icon: 'ion-pound',
      },

      {
        type: 'author',
        name: 'profile',
        params: { username: useAuthor.value },
        title: 'My articles',
      },
      {
        type: 'favorited',
        name: 'profile-favorites',
        params: { username: useFavorited.value },
        title: 'Favorited Articles',
      },
    ])

    const show = computed<Record<ArticleNavLinkType, boolean>>(() => ({
      globalFeed: useGlobalFeed.value,
      myFeed: useMyFeed.value,
      tag: useTag.value !== '',
      author: useAuthor.value !== '',
      favorited: useFavorited.value !== '',
    }))

    const links = computed<ArticleNavLink[]>(() => allLinks.value.filter(link => show.value[link.type]))

    return {
      links,
    }
  },
})
</script>
