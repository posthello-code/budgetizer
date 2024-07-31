import axios, { AxiosResponse } from "axios";
import environment from "../environment/default";
import CryptoJS from "crypto-js";
import { Budget, EncryptedBudget } from "../budgets/models";
export default class budgetizerApi {
  private static encryptBudgetData(
    data: string,
    passphrase = "super secret phrase"
  ) {
    const encryptedPayload = CryptoJS.AES.encrypt(data, passphrase).toString();
    data = encryptedPayload;
    return data;
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
    const encryptedData: string = this.encryptBudgetData(
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
    return axios.get(url).then((r) => {
      const encryptedBudget: EncryptedBudget = r.data;
      const decryptor: CryptoJS.lib.WordArray = CryptoJS.AES.decrypt(
        encryptedBudget.data,
        passphrase
      );
      const decrypted: string = decryptor.toString(CryptoJS.enc.Utf8);
      r.data.data = JSON.parse(decrypted);
      return r;
    });
  }

  static async updateBudgetById(
    id: string,
    budget: Budget,
    passphrase: string = "super secret phrase"
  ): Promise<AxiosResponse> {
    const url = `${environment.baseUrl}/budgets/${id}`;
    const encryptor: string = this.encryptBudgetData(
      JSON.stringify(budget.data),
      passphrase
    );

    const encryptedBudget: EncryptedBudget = { id: id, data: encryptor };
    return axios.put(url, encryptedBudget);
  }
}
