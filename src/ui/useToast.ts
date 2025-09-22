
import { bus } from './bus'

export function useToast() {
  function show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    bus.emit('toast', { message, type })
  }
  return { show }
}
