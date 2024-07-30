import { AxiosResponse } from "axios";
import useSWR from "swr";
import budgetizerApi from "@/app/services/api";

const fetcher = (id: string): Promise<AxiosResponse> => {
  return budgetizerApi.getBudgetById(id);
};

export default function useBudget(id: String) {
  const { data, error, isLoading } = useSWR(id, fetcher, {});
  return { data, isLoading, isError: error };
}
