import themis, { initialize, SymmetricKey } from "wasm-themis";

export default class {
  // wasm file needs to be loaded in order to use it
  private static async initThemis() {
    await initialize("_next/static/chunks/app/libthemis.wasm")
      .then(() => {})
      .catch((err) => {});
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
