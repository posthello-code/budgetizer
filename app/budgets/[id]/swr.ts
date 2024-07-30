import { AxiosResponse } from "axios";
import useSWR from "swr";
import budgetizerApi from "../../services/budgetizer-api";

const fetcher = async (id: string): Promise<AxiosResponse> => {
  const r = await budgetizerApi.getBudgetById(id);
  return r.data;
};

export default function useBudget(id: String) {
  const { data, error, isLoading } = useSWR(id, fetcher, {});
  return { data, isLoading, isError: error };
}
