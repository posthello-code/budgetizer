import axios, { AxiosResponse } from "axios";
import environment from "../environment/default";
import { Budget, EncryptedBudget } from "../budgets/models";
import { SymmetricKey } from "wasm-themis";
import libthemis from "./themis-wasm";
export default class budgetizerApi {
  static async ping(): Promise<AxiosResponse> {
    const url = `${environment.baseUrl}/`;
    return axios.get(url);
  }

  static async createBudget(
    newBudget: Omit<Budget, "id">,
    key: SymmetricKey
  ): Promise<AxiosResponse> {
    const url = `${environment.baseUrl}/budgets`;
    const dataToEncypt = Buffer.from(JSON.stringify(newBudget.data), "utf-8");
    const encryptedData = await libthemis.encryptWithKey(dataToEncypt, key);

    const data: Omit<EncryptedBudget, "id"> = { data: encryptedData };
    return axios.post(url, data);
  }

  static async getBudgetById(id: string, key: string): Promise<AxiosResponse> {
    const url = `${environment.baseUrl}/budgets/${id}`;
    return axios
      .get(url)
      .then(async (response) => {
        const arr = new Uint8Array(
          Object.values(response.data.data) as Array<number>
        );

        const decryptor = await libthemis.decryptWithKey(
          arr,
          Uint8Array.from(atob(key), (c) => c.charCodeAt(0))
        );
        const decrypted: string = new TextDecoder().decode(decryptor);

        response.data.data = JSON.parse(decrypted);
        console.log(response.data.data);
        return response;
      })
      .catch((e) => {
        return e;
      });
  }

  static async updateBudgetById(
    id: string,
    budget: Budget,
    key: string
  ): Promise<AxiosResponse> {
    const uint8 = Uint8Array.from(atob(key), (c) => c.charCodeAt(0));
    const url = `${environment.baseUrl}/budgets/${id}`;
    const dataToEncypt = new TextEncoder().encode(JSON.stringify(budget.data));
    const encryptedData = await libthemis.encryptWithKey(dataToEncypt, uint8);

    const data: EncryptedBudget = { id: id, data: encryptedData };

    return axios.put(url, data);
  }
}
