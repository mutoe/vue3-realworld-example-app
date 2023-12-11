import type { Ref } from 'vue'
import { ref } from 'vue'
import { routerPush } from 'src/router'
import { isFetchError } from 'src/services'
import { userStorage } from 'src/store/user.ts'

interface UseAsync<T extends (...args: unknown[]) => unknown> {
  active: Ref<boolean>
  run: (...args: Parameters<T>) => Promise<ReturnType<T>>
}

export default function useAsync<T extends (...args: unknown[]) => unknown>(fn: T): UseAsync<T> {
  const active: UseAsync<T>['active'] = ref(false)

  const run: UseAsync<T>['run'] = async (...args) => {
    active.value = true
    try {
      const result = await fn(...args)
      return result as ReturnType<T>
    }
    catch (error) {
      if (isFetchError(error) && error.status === 401) {
        userStorage.remove()
        await routerPush('login')
        throw new Error('Unauthorized or token expired')
      }
      throw error
    }
    finally {
      active.value = false
    }
  }

  return { active, run }
}
