import Keyv from "keyv";

class KV {
  private store = new Keyv();

  async get<T = unknown>(key: string): Promise<T | undefined> {
    return this.store.get<T>(key);
  }

  async set<T = unknown>(key: string, value: T, ttlMs?: number): Promise<void> {
    await this.store.set(key, value, ttlMs);
  }

  async delete(key: string): Promise<void> {
    await this.store.delete(key);
  }
}

export default new KV();