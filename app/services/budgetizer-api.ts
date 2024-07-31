import axios, { AxiosResponse } from "axios";
import environment from "../environment/default";
import CryptoJS from "crypto-js";
export default class budgetizerApi {
  static async ping(): Promise<AxiosResponse> {
    const url = `${environment.baseUrl}/`;
    return axios.get(url);
  }
  static async createBudget(data: { data: string }): Promise<AxiosResponse> {
    const url = `${environment.baseUrl}/budgets`;
    const symmetricKey = "secret key";
    const encryptedPayload = CryptoJS.AES.encrypt(
      JSON.stringify(data.data),
      symmetricKey
    ).toString();
    data.data = encryptedPayload;
    return axios.post(url, data);
  }
  static async getBudgetById(id: string): Promise<AxiosResponse> {
    const url = `${environment.baseUrl}/budgets/${id}`;
    return axios.get(url).then((r) => {
      const symmetricKey = "secret key";
      const decrypted = CryptoJS.AES.decrypt(r.data.data, symmetricKey);
      const decryptedPayload = decrypted.toString(CryptoJS.enc.Utf8);
      r.data.data = JSON.parse(decryptedPayload);
      return r;
    });
  }
  static async updateBudgetById(id: string, data: any): Promise<AxiosResponse> {
    const url = `${environment.baseUrl}/budgets/${id}`;
    return axios.put(url, data);
  }
}
