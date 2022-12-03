type StorageType = 'localStorage' | 'sessionStorage'

export default class Storage<T = unknown> {
  private readonly key: string
  private readonly storageType: StorageType

  constructor (key: string, storageType: StorageType = 'localStorage') {
    this.key = key
    this.storageType = storageType
  }

  get (): T | null {
    try {
      const value = window[this.storageType].getItem(this.key) ?? ''
      return JSON.parse(value)
    } catch {
      return null
    }
  }

  set (value: T): void {
    const strValue = JSON.stringify(value)
    window[this.storageType].setItem(this.key, strValue)
  }

  remove (): void {
    window[this.storageType].removeItem(this.key)
  }
}
