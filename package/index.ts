import axios, { CreateAxiosDefaults } from "axios";
import { useServiceConfig } from "./interceptors";
import { initQuery } from "./httpRequest";
export * from "axios";
export const create = (config: CreateAxiosDefaults) => {
  const service = axios.create(config);
  const insertPrefix = initQuery(service);
  useServiceConfig(service);
  return { service, insertPrefix };
};
