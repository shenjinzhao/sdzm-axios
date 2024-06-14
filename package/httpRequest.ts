import { AxiosInstance, AxiosRequestConfig } from "axios";

export interface Response<T = any> {
  data: T;
  message: string | null;
  status: string;
}

export type IParams = Record<string, any>;
export interface RequestConfig extends AxiosRequestConfig {
  mock?: boolean;
}
class HttpRequestBase {
  constructor(service: AxiosInstance) {
    this.get = service.get;
    this.post = service.post;
    this.put = service.put;
    this.del = service.delete;
  }
  protected get: AxiosInstance["get"];
  protected post: AxiosInstance["post"];
  protected put: AxiosInstance["put"];
  protected del: AxiosInstance["delete"];
  protected httpGet = <T>(
    url: string,
    params: IParams,
    config: AxiosRequestConfig<T>
  ) => this.get<any, T>(url, { params, ...config }) as Promise<T>;

  protected httpPost = <T>(
    url: string,
    data: IParams = {},
    config: AxiosRequestConfig<T>
  ) => this.post<any, T>(url, data, config) as Promise<T>;

  protected httpPut = <T>(
    url: string,
    data: IParams = {},
    config: AxiosRequestConfig<T>
  ) => this.put<any, T>(url, data, config) as Promise<T>;

  protected httpDel = <T>(
    url: string,
    params: IParams,
    config: AxiosRequestConfig<T>
  ) => this.del<any, T>(url, { params, ...config }) as Promise<T>;
}

class HttpRequest extends HttpRequestBase {
  insertPrefix = (prefix: string) => {
    const getUrl = (url: string) => `${prefix ? prefix + "/" + url : url}`;
    function get<T>(
      this: HttpRequest,
      url: string,
      data: IParams = {},
      config?: RequestConfig
    ): Promise<T> {
      return this.httpGet(getUrl(url), data, config || {});
    }
    function post<T>(
      this: HttpRequest,
      url: string,
      data: IParams = {},
      config?: RequestConfig
    ): Promise<T> {
      return this.httpPost(getUrl(url), data, config || {});
    }
    function put<T>(
      this: HttpRequest,
      url: string,
      data: IParams = {},
      config?: RequestConfig
    ): Promise<T> {
      return this.httpPut(getUrl(url), data, config || {});
    }
    function del<T>(
      this: HttpRequest,
      url: string,
      data: IParams = {},
      config?: RequestConfig
    ): Promise<T> {
      return this.httpDel(getUrl(url), data, config || {});
    }
    return {
      get: get.bind(this),
      post: post.bind(this),
      put: put.bind(this),
      del: del.bind(this),
    } as const;
  };
}

export function initQuery(service: AxiosInstance) {
  const insertPrefix = new HttpRequest(service).insertPrefix;
  return insertPrefix;
}
