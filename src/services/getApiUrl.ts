"use client";
import config from "./config.json";

const apiDomainNobat =
  process.env.NODE_ENV === "development" ||
  window.location.hostname === "dev.arenapp.ir"
    ? config.developmentNobatApi
    : config.developmentNobatApi;
const apiDomain =
  process.env.NODE_ENV === "development" ||
  window.location.hostname === "dev.arenapp.ir"
    ? config.developmentApi
    : config.developmentApi;

export { apiDomain, apiDomainNobat };
