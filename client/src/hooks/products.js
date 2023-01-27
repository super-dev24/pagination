import { useQuery } from "react-query";
import axios from "axios";

export const useProducts = (limit, offset) => {
  return useQuery(
    ["products", offset, limit],
    async () => {
      const { data } = await axios.get("http://localhost:4000/products", {
        params: {
          offset: offset,
          limit: limit,
        },
      });
      return data;
    },
    { keepPreviousData: true }
  );
};
