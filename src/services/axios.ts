import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import config from "./config.json";
import urls from "./urls";
import { apiDomainNobat } from "./getApiUrl";
import Toastify from "@/components/elements/toasts/Toastify";

const http = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

http.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const asd = (failedRequest: any) =>
  axios
    .post("https://www.example.com/auth/token/refresh")
    .then((tokenRefreshResponse) => {
      localStorage.setItem("token", tokenRefreshResponse.data.token);
      failedRequest.response.config.headers["Authorization"] =
        "Bearer " + tokenRefreshResponse.data.token;
      return Promise.resolve();
    });

const refreshAuthLogic = async (failedRequest: any) => {
  const refreshToken = localStorage.getItem("refreshToken");
  const accessToken = localStorage.getItem("accessToken");

  try {
    const res = await axios.post(
      `${apiDomainNobat}${urls.login.refreshToken.url}`,
      {
        refreshToken,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const tokens = res.data.value;

    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);
    failedRequest.response.config.headers[
      "Authorization"
    ] = `Bearer ${tokens.accessToken}`;

    return Promise.resolve();
  } catch (error) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    Toastify("error", "دوباره لاگین شوید توکن منقضی شده است");
  }
};

createAuthRefreshInterceptor(http, refreshAuthLogic);

export { http };
