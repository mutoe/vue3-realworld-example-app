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
    const result = await fn(...args)
    active.value = false
    return result as ReturnType<T>
  }

  return { active, run }
}
