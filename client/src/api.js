import axios from "axios";

const PRODUCT_URL = "http://localhost:4000/products";

const deleteProducts = (params) => {
  return axios.delete("http://localhost:4000/products", {
    params,
  });
};

const postProducts = (params) => {
  return axios.post("http://localhost:4000/products", null, {
    params,
  });
};

export { deleteProducts, postProducts };
