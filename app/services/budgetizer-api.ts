import axios, { AxiosResponse } from "axios";
import environment from "../environment/default";
export default class budgetizerApi {
  static async ping(): Promise<AxiosResponse> {
    const url = `${environment.baseUrl}/`;
    return axios.get(url);
  }
  static async createBudget(data: {}): Promise<AxiosResponse> {
    const url = `${environment.baseUrl}/budgets`;
    return axios.post(url, data);
  }
  static async getBudgetById(id: string): Promise<AxiosResponse> {
    const url = `${environment.baseUrl}/budgets/${id}`;
    return axios.get(url);
  }
  static async updateBudgetById(id: string, data: any): Promise<AxiosResponse> {
    const url = `${environment.baseUrl}/budgets/${id}`;
    return axios.put(url, data);
  }
}
