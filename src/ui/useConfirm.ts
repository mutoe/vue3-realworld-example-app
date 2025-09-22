import { bus } from './bus'

export function useConfirm() {
  function ask(
    message: string,
    onConfirm: () => void,
    onCancel?: () => void,
  ) {
    bus.emit('confirm', { message, onConfirm, onCancel })
  }
  return { ask }
}
