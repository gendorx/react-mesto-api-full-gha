import Api from "./api";
import Auth from "./auth";

/** config for api */

const apiConfig = {
  baseUrl: "https://api.gendorx-frontend.nomoredomains.monster",
  headers: {
    "Content-Type": "application/json",
  },
};

export const api = new Api(apiConfig);
export const auth = new Auth(apiConfig);
