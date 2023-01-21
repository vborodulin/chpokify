enum TStorageType {
  LOCAL_STORAGE = 'localStorage',
  SESSION_STORAGE = 'sessionStorage',
}

class IsomorphicStorage implements Storage {
  private static storageAvailable(type: TStorageType): boolean {
    let storage;

    try {
      storage = window[type];
      const x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (err: any) {
      return (
      // everything except Firefox
        err.code === 22
          // Firefox
          || err.code === 1014
          // test name field too, because code might not be present
          // everything except Firefox
          || err.name === 'QuotaExceededError'
          // Firefox
          || err.name === 'NS_ERROR_DOM_QUOTA_REACHED')
        // acknowledge QuotaExceededError only if there's something already stored
        && (!!storage && storage.length !== 0);
    }
  }

  private readonly memoryStorage: Record<string, string | null> = {};

  private readonly storage: Storage | null = null;

  private readonly isAvailable: boolean;

  public constructor(type: TStorageType) {
    this.isAvailable = IsomorphicStorage.storageAvailable(type);

    if (this.isAvailable) {
      this.storage = window[type];
    }
  }

  public getItem(key: string): string | null {
    if (this.storage) {
      return this.storage.getItem(key);
    }

    return this.memoryStorage[key];
  }

  public setItem(key: string, value: any): void {
    if (this.storage) {
      this.storage.setItem(key, value);
    } else {
      this.memoryStorage[key] = value;
    }
  }

  public get length(): number {
    if (this.storage) {
      return this.storage.length;
    }

    return Object.keys(this.memoryStorage).length;
  }

  public removeItem(key: string): void {
    if (this.storage) {
      this.storage.removeItem(key);
    } else {
      delete this.memoryStorage[key];
    }
  }

  public clear(): void {
    if (this.storage) {
      this.storage.clear();
    } else {
      Object.keys(this.memoryStorage)
        .forEach((key) => {
          delete this.memoryStorage[key];
        });
    }
  }

  public key(index: number): string | null {
    if (this.storage) {
      return this.storage.key(index);
    }

    return Object.keys(this.memoryStorage)[index] || null;
  }
}

const isomorphicLocalStorage = new IsomorphicStorage(TStorageType.LOCAL_STORAGE);
const isomorphicSessionStorage = new IsomorphicStorage(TStorageType.SESSION_STORAGE);

export {
  isomorphicLocalStorage,
  isomorphicSessionStorage,
};
