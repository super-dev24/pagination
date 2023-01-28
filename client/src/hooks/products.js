import { useQuery } from "react-query";
import axios from "axios";

export const useProducts = (params) => {
  return useQuery(
    ["products", params],
    async () => {
      const { data } = await axios.get("http://localhost:4000/products", {
        params,
      });
      return data;
    },
    { keepPreviousData: true }
  );
};
