import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { AppRouteNames } from '../router'

export type ArticlesType = 'global-feed' | 'my-feed' | 'tag-feed' | 'user-feed' | 'user-favorites-feed'
export const articlesTypes: ArticlesType[] = ['global-feed', 'my-feed', 'tag-feed', 'user-feed', 'user-favorites-feed']
export const isArticlesType = (type: any): type is ArticlesType => articlesTypes.includes(type)

const routeNameToArticlesType: Partial<Record<AppRouteNames, ArticlesType>> = ({
  'global-feed': 'global-feed',
  'my-feed': 'my-feed',
  tag: 'tag-feed',
  profile: 'user-feed',
  'profile-favorites': 'user-favorites-feed',
})

export function useArticlesMeta () {
  const route = useRoute()

  const tag = ref('')
  const username = ref('')
  const articlesType = ref<ArticlesType>('global-feed')

  watch(
    () => route.name,
    routeName => {
      const possibleArticlesType = routeNameToArticlesType[routeName as AppRouteNames]
      if (!isArticlesType(possibleArticlesType)) return

      articlesType.value = possibleArticlesType
    },
    { immediate: true },
  )

  watch(
    () => route.params.username,
    usernameParam => {
      if (usernameParam !== username.value) {
        username.value = typeof usernameParam === 'string' ? usernameParam : ''
      }
    },
    { immediate: true },
  )

  watch(
    () => route.params.tag,
    tagParam => {
      if (tagParam !== tag.value) {
        tag.value = typeof tagParam === 'string' ? tagParam : ''
      }
    },
    { immediate: true },
  )

  return {
    tag: computed(() => tag.value),
    username: computed(() => username.value),
    articlesType: computed(() => articlesType.value),
    metaChanged: computed(() => `${articlesType.value}-${username.value}-${tag.value}`),
  }
}
