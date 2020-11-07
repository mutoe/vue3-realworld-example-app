import { watch } from 'vue'
import { useRoute } from 'vue-router'
import type { AppRouteNames } from '../router'

import { updateArticlesMeta, ArticlesType, isArticlesType } from '../store/articlesMeta'

const routeNameToArticlesType: Partial<Record<AppRouteNames, ArticlesType>> = ({
  'global-feed': 'global-feed',
  'my-feed': 'my-feed',
  tag: 'tag-feed',
  profile: 'user-feed',
  'profile-favorites': 'user-favorites-feed',
})

export function useArticlesMeta () {
  const route = useRoute()

  watch(
    () => route.name,
    routeName => {
      const possibleArticlesType = routeNameToArticlesType[routeName as AppRouteNames]
      if (!isArticlesType(possibleArticlesType)) return

      updateArticlesMeta('articlesType', possibleArticlesType)
    },
    { immediate: true },
  )

  watch(
    () => route.params.username,
    usernameParam => {
      const value = typeof usernameParam === 'string' ? usernameParam : ''
      updateArticlesMeta('username', value)
    },
    { immediate: true },
  )

  watch(
    () => route.params.tag,
    tagParam => {
      const value = typeof tagParam === 'string' ? tagParam : ''
      updateArticlesMeta('tag', value)
    },
    { immediate: true },
  )
}
