type Handler<T = any> = (payload: T) => void

class TinyBus {
  private map = new Map<string, Set<Handler>>()

  on<T = any>(type: string, handler: Handler<T>) {
    if (!this.map.has(type))
      this.map.set(type, new Set())
    this.map.get(type)!.add(handler as Handler)
    return () => this.off(type, handler)
  }

  off<T = any>(type: string, handler: Handler<T>) {
    this.map.get(type)?.delete(handler as Handler)
  }

  emit<T = any>(type: string, payload?: T) {
    this.map.get(type)?.forEach(h => h(payload))
  }
}

export const bus = new TinyBus()

export interface ConfirmPayload {
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
}

export interface ToastPayload {
  type?: 'success' | 'error' | 'info'
  message: string
  duration?: number
}
