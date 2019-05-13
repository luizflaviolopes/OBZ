import api from "./Api";
import qs from "qs";

export const TOKEN_KEY = "@obz-Token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = async (login, pass) => {
  localStorage.setItem("login", login);
  localStorage.setItem("pass", pass);

  const response = await api.post(
    "/api/login",
    qs.stringify({
      Login: login,
      Password: pass
    }),
    { method: "POST" }
  );
  if (response.data.accessToken) {
    localStorage.setItem(TOKEN_KEY, response.data.accessToken);
    return true;
  } else return false;
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const renewToken = () => {
  return login(localStorage.getItem("login"), localStorage.getItem("pass"));
};
