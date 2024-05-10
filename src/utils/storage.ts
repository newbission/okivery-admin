interface StorageClass {
  set(key: string, value: any): void;
  get(key: string): string | null;
}

export class LocalStorage implements StorageClass {
  private static instance: LocalStorage | null = null;

  private constructor() {}

  public static getInstance(): LocalStorage {
    if (!LocalStorage.instance) {
      LocalStorage.instance = new LocalStorage();
    }
    return LocalStorage.instance;
  }
  set(key: string, value: any) {
    localStorage.setItem(key, value);
  }
  get(key: string) {
    return localStorage.getItem(key);
  }
}

export class SessionStorage implements StorageClass {
  private static instance: SessionStorage | null = null;

  private constructor() {}

  public static getInstance(): SessionStorage {
    if (!SessionStorage.instance) {
      SessionStorage.instance = new SessionStorage();
    }
    return SessionStorage.instance;
  }
  set(key: string, value: any) {
    sessionStorage.setItem(key, value);
  }
  get(key: string) {
    return sessionStorage.getItem(key);
  }
}
