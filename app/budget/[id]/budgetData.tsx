import axios from "axios";
import useSWR from "swr";
const fetcher = (url: string) => {
  if (!url.includes("undefined")) {
    return axios.get(url).then((res) => {
      console.log(res.data);
      return res.data;
    });
  } else {
    return new Error("Error");
  }
};

export default function useBudget(id: String) {
  const { data, error, isLoading } = useSWR(
    id ? "https://budgetizer.onrender.com/budgets/" + id : null,
    fetcher,
    {}
  );
  // render data
  return { data, isLoading, isError: error };
}
