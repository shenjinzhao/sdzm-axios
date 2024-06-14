import axios from "axios";
import { useServiceConfig } from "./interceptors";
import { initQuery } from "./httpRequest";

export interface Config {
  baseURL: string;
  timeout?: number;
}

export function create(config: Config) {
  const service = axios.create();
  const insertPrefix = initQuery(service);
  useServiceConfig(service, config);
  return { service, insertPrefix };
}
