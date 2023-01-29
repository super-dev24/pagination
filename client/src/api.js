import axios from "axios";

const PRODUCT_URL = process.env.REACT_APP_PUBLIC_API;

const deleteProducts = (params) => {
  return axios.delete(PRODUCT_URL, {
    params,
  });
};

const postProducts = (params) => {
  return axios.post(PRODUCT_URL, null, {
    params,
  });
};

export { deleteProducts, postProducts };
