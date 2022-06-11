import { api } from 'src/services'
import type { Article } from 'src/services/api'
import useAsync from 'src/utils/use-async'
import type { ComputedRef } from 'vue'

interface useFavoriteArticleProps {
  isFavorited: ComputedRef<boolean>
  articleSlug: ComputedRef<string>
  onUpdate: (newArticle: Article) => void
}

export const useFavoriteArticle = ({ isFavorited, articleSlug, onUpdate }: useFavoriteArticleProps) => {
  const favoriteArticle = async () => {
    const requestor = isFavorited.value ? api.articles.deleteArticleFavorite : api.articles.createArticleFavorite
    const article = await requestor(articleSlug.value).then(res => res.data.article)
    onUpdate(article)
  }

  const { active, run } = useAsync(favoriteArticle)

  return {
    favoriteProcessGoing: active,
    favoriteArticle: run,
  }
}
