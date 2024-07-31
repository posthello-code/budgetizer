import { AxiosResponse } from "axios";
import useSWR from "swr";
import budgetizerApi from "../../services/budgetizer-api";

const fetcher = async (id: string): Promise<AxiosResponse> => {
  const r = await budgetizerApi.getBudgetById(id);
  r.data = { id: r.data._id, data: r.data.data };
  return r.data;
};

export default function useBudget(id: String) {
  const { data, error, isLoading } = useSWR(id, fetcher, {});
  return { data, isLoading, isError: error };
}
