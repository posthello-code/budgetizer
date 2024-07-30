import axios, { AxiosResponse } from "axios";
import environment from "../environment/default";
export default class budgetizerApi {
  static async createBudget(data: {}): Promise<AxiosResponse> {
    const url = `${environment.baseUrl}/budgets`;
    return axios.post(url, data).then((res) => {
      return res.data;
    });
  }
  static async getBudgetById(id: string): Promise<AxiosResponse> {
    const url = `${environment.baseUrl}/budgets/${id}`;
    return axios.get(url).then((res) => {
      return res.data;
    });
  }
  static async updateBudgetById(id: string, data: {}): Promise<AxiosResponse> {
    const url = `${environment.baseUrl}/budgets/${id}`;
    return axios.put(url, data).then((res) => {
      return res.data;
    });
  }
}
