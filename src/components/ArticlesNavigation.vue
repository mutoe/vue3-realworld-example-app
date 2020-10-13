<template>
  <ul class="nav nav-pills outline-active">
    <li
      v-for="link in links"
      :key="link.type"
      class="nav-item"
    >
      <RouterLink
        class="nav-link"
        active-class="active"
        :to="link.href"
      >
        <i
          v-if="link.icon"
          :class="link.icon"
        /> {{ link.title }}
      </RouterLink>
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'

type ArticleNavLinkType = 'globalFeed' | 'myFeed' | 'tag' | 'author' | 'favorited'

interface ArticleNavLink {
  type: ArticleNavLinkType
  href: string
  title: string
  icon?: string
}

export default defineComponent({
  name: 'ArticleNavigation',
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
      { type: 'globalFeed', href: '/', title: 'Global Feed' },
      { type: 'myFeed', href: '/my-feeds', title: 'Your Feed' },
      { type: 'tag', href: `/tag/${useTag.value}`, title: useTag.value, icon: 'ion-pound' },
      { type: 'author', href: `/profile/${useAuthor.value}`, title: 'My articles' },
      { type: 'favorited', href: `/profile/${useFavorited.value}/favorites`, title: 'Favorited Articles' },
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
