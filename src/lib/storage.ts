interface StoragesList {
  [key: string] : () => Storage
}

export class StorageFC {
  private static storagesList: StoragesList = {
    'LocalStorage': () => LocalStorage.getInstance(),
  };

  public static getStorage(storageName: string) {
    return this.storagesList[storageName]();
  }
}

abstract class Storage {
  public abstract getItem(key: string): string | null;
  public abstract setItem(key: string, value: string): void;
  public abstract removeItem(key: string): void;
}

export class LocalStorage extends Storage {
  private static instance: LocalStorage;

  public getItem(key: string): string | null {
    return window.localStorage.getItem(key);
  }

  public setItem(key: string, value: string) : void {
    window.localStorage.setItem(key, value);
  }

  public removeItem(key: string): void {
    window.localStorage.removeItem(key)
  }

  public key(k: number): string | null {
    if((k > 0) && (k < window.localStorage.length))
      return window.localStorage.key(k)
    return null
  }

  public static getInstance() {
    if (!LocalStorage.instance) {
      LocalStorage.instance = new LocalStorage();
    }
    return LocalStorage.instance;
  }
}
