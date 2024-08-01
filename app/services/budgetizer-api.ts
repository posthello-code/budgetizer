import axios, { AxiosResponse } from "axios";
import environment from "../environment/default";
import { Budget, EncryptedBudget } from "../budgets/models";
import themis, { initialize } from "wasm-themis";

export default class budgetizerApi {
  private static async initThemis() {
    await initialize("_next/static/chunks/app/libthemis.wasm")
      .then(() => {})
      .catch((err) => {});
  }
  private static async encryptBudgetData(
    data: string,
    passphrase = "super secret phrase"
  ) {
    // web assembly must be loaded before using themis
    await this.initThemis();
    const cell = themis.SecureCellSeal.withPassphrase(passphrase);
    const plaintext = new TextEncoder().encode(data);
    const encrypted = cell.encrypt(plaintext);
    return encrypted;
  }

  static async ping(): Promise<AxiosResponse> {
    const url = `${environment.baseUrl}/`;
    return axios.get(url);
  }

  static async createBudget(
    newBudget: Omit<Budget, "id">,
    passphrase: string = "super secret phrase"
  ): Promise<AxiosResponse> {
    const url = `${environment.baseUrl}/budgets`;
    const encryptedData: Uint8Array = await this.encryptBudgetData(
      JSON.stringify(newBudget.data),
      passphrase
    );

    const data: Omit<EncryptedBudget, "id"> = { data: encryptedData };
    return axios.post(url, data);
  }

  static async getBudgetById(
    id: string,
    passphrase = "super secret phrase"
  ): Promise<AxiosResponse> {
    const url = `${environment.baseUrl}/budgets/${id}`;
    return axios
      .get(url)
      .then(async (response) => {
        // web assembly must be loaded before using themis
        await this.initThemis();

        const arr = new Uint8Array(
          Object.values(response.data.data) as Array<number>
        );
        const cell = themis.SecureCellSeal.withPassphrase(passphrase);
        const decryptor = cell.decrypt(arr);
        const decrypted: string = new TextDecoder().decode(decryptor);

        response.data.data = JSON.parse(decrypted);
        return response;
      })
      .catch((e) => {
        return e;
      });
  }

  static async updateBudgetById(
    id: string,
    budget: Budget,
    passphrase: string = "super secret phrase"
  ): Promise<AxiosResponse> {
    const url = `${environment.baseUrl}/budgets/${id}`;
    const encryptor: Uint8Array = await this.encryptBudgetData(
      JSON.stringify(budget.data),
      passphrase
    );

    const encryptedBudget: EncryptedBudget = { id: id, data: encryptor };
    return axios.put(url, encryptedBudget);
  }
}
