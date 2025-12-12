import { AxiosResponse } from "axios";
import budgetizerApi from "../../services/budgetizer-api";
import useSWRImmutable from "swr/immutable";
import { useBudgetStore } from "../../services/store";

const fetcher = async (id: string, key: string): Promise<AxiosResponse> => {
  const item = key;
  const r = await budgetizerApi.getBudgetById(id, item);
  r.data = { id: r.data._id, data: r.data.data };
  return r.data;
};

export default function useBudget(id: string | null) {
  const symKey = useBudgetStore((state) => state.symKey);
  const { data, error, isLoading } = useSWRImmutable(
    id ? [id, symKey] : null,
    ([id, symKey]) => fetcher(id, symKey),
    {}
  );
  return { data, isLoading, isError: error };
}
