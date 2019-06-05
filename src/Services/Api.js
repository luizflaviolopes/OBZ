import axios from "axios";
import { getToken, renewToken } from "./Auth";

const api = axios.create({
  //baseURL: "http://localhost:5000",
  headers: { "Content-Type": "application/json" }
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(undefined, err => {
  const error = err.response;

  if (error) {
    // if error is 401
    if (
      error.status === 401 &&
      error.config &&
      !error.config.__isRetryRequest
    ) {
      // request for a new token
      return renewToken().then(response => {
        // update the error config with new token
        error.config.__isRetryRequest = true;
        error.config.headers.token = localStorage.getItem("accessToken");
        return api(error.config);
      });
    }
  }
});

export default api;
