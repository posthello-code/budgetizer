import { AxiosResponse } from "axios";
import budgetizerApi from "../../services/budgetizer-api";
import useSWRImmutable from "swr/immutable";

const fetcher = async (id: string): Promise<AxiosResponse> => {
  const item = localStorage.getItem("tempKey") as string;
  const r = await budgetizerApi.getBudgetById(id, item);
  localStorage.removeItem("tempKey");
  r.data = { id: r.data._id, data: r.data.data };
  return r.data;
};

export default function useBudget(id: String) {
  console.log("useBudget");
  const { data, error, isLoading } = useSWRImmutable(id, fetcher, {});
  return { data, isLoading, isError: error };
}
