import { Ref, ref } from 'vue'

interface CreateAsyncProcessReturn<T extends (...args: any[]) => any> {
  active: Ref<boolean>
  run: (...args : Parameters<T>) => Promise<ReturnType<T>>
}

export default function createAsyncProcess<T extends (...args: any[]) => any> (fn: T): CreateAsyncProcessReturn<T> {
  const active: CreateAsyncProcessReturn<T>['active'] = ref(false)

  const run: CreateAsyncProcessReturn<T>['run'] = async (...args) => {
    active.value = true
    const result = await fn(...args)
    active.value = false
    return result
  }

  return { active, run }
}
