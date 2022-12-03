import { routerPush } from 'src/router'
import { isFetchError } from 'src/services'
import type { Ref } from 'vue'
import { ref } from 'vue'

interface UseAsync<T extends (...args: unknown[]) => unknown> {
  active: Ref<boolean>
  run: (...args: Parameters<T>) => Promise<ReturnType<T>>
}

export default function useAsync<T extends (...args: unknown[]) => unknown> (fn: T): UseAsync<T> {
  const active: UseAsync<T>['active'] = ref(false)

  const run: UseAsync<T>['run'] = async (...args) => {
    active.value = true
    try {
      const result = await fn(...args)
      return result as ReturnType<T>
    } catch (error) {
      if (isFetchError(error) && error.status === 401) {
        await routerPush('login')
        throw new Error('Need to login first')
      }
      throw error
    } finally {
      active.value = false
    }
  }

  return { active, run }
}
