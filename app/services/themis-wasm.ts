import type { SymmetricKey } from "wasm-themis";

let themis: any;
let initialize: any;
let isInitialized = false;

async function loadThemis() {
  if (isInitialized) return;
  if (typeof window === 'undefined') return;

  const wasmThemis = await import('wasm-themis');
  themis = wasmThemis.default;
  initialize = wasmThemis.initialize;
  isInitialized = true;
}

export default class {
  // wasm file needs to be loaded in order to use it
  private static async initThemis() {
    if (typeof window === 'undefined') return;
    await loadThemis();
    await initialize("/libthemis.wasm")
      .then(() => {})
      .catch(() => {});
  }
  static async generateKey() {
    await this.initThemis();
    let symmetricKey = new themis.SymmetricKey();
    return symmetricKey;
  }
  public static async encryptWithKey(data: any, key: SymmetricKey) {
    await this.initThemis();
    let cell = themis.SecureCellSeal.withKey(key);
    let encrypted = cell.encrypt(data);

    return encrypted;
  }
  public static async decryptWithKey(data: Uint8Array, key: SymmetricKey) {
    await this.initThemis();
    let cell = themis.SecureCellSeal.withKey(key);
    let encrypted = cell.decrypt(data);

    return encrypted;
  }
}
