import { computed, reactive } from 'vue'

export type ArticlesType = 'global-feed' | 'my-feed' | 'tag-feed' | 'user-feed' | 'user-favorites-feed'
export const articlesTypes: ArticlesType[] = ['global-feed', 'my-feed', 'tag-feed', 'user-feed', 'user-favorites-feed']
export const isArticlesType = (type: any): type is ArticlesType => articlesTypes.includes(type)

export interface ArticlesMeta {
  tag: string,
  username: string,
  articlesType: ArticlesType,
}

const articlesMeta = reactive<ArticlesMeta>({
  tag: '',
  username: '',
  articlesType: 'global-feed',
})

export const tag = computed(() => articlesMeta.tag)
export const username = computed(() => articlesMeta.username)
export const articlesType = computed(() => articlesMeta.articlesType)
export const infoUpdated = computed(() => `${articlesType.value}-${username.value}-${tag.value}`)

export function updateArticlesMeta (field: 'tag' | 'username', value: string): void;
export function updateArticlesMeta (field: 'articlesType', value: ArticlesType): void;
export function updateArticlesMeta (field: 'tag' | 'username' | 'articlesType', value: any): void {
  articlesMeta[field] = value
}
