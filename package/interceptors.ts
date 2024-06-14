import { AxiosInstance } from "axios";
import { Config } from ".";

export const useServiceConfig = (service: AxiosInstance, config: Config) => {
  const { baseURL, timeout = 10 * 1000 } = config;
  // 可以跨域请求
  service.defaults.withCredentials = true;
  // 验证可用域名
  service.defaults.baseURL = baseURL;
  service.defaults.headers.post["Content-Type"] = "application/json";
  service.defaults.headers.common["Cache-Control"] = "no-cache";
  service.defaults.headers.common["Pragma"] = "no-cache";
  service.defaults.timeout = timeout;

  service.interceptors.request.use(
    (config) => {
      // 公共处理
      return config;
    },
    (error) => {
      return Promise.reject(error.response);
    }
  );

  service.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );
};
