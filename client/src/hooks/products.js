import { useQuery } from "react-query";
import axios from "axios";

export const useProducts = (params) => {
  return useQuery(
    ["products", params],
    async () => {
      const { data } = await axios.get(process.env.REACT_APP_PUBLIC_API, {
        params,
      });
      return data;
    },
    { keepPreviousData: true }
  );
};
