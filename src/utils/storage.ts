type StorageType = 'localStorage' | 'sessionStorage'

export default class Storage<T = unknown> {
  private readonly key: string
  private readonly storageType: StorageType

  constructor(key: string, storageType: StorageType = 'localStorage') {
    this.key = key
    this.storageType = storageType
  }

  get storage() {
    return window[this.storageType]
  }

  get(): T | null {
    try {
      const value = this.storage.getItem(this.key) ?? ''
      return JSON.parse(value) as T
    }
    catch {
      return null
    }
  }

  set(value: T): void {
    const strValue = JSON.stringify(value)
    this.storage.setItem(this.key, strValue)
  }

  remove(): void {
    this.storage.removeItem(this.key)
  }
}
