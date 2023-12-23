import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'

export interface IResponseData <T> {
  code: number,
  msg ?: string,
  content: T
}

const defaultConfig = {
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 10000,
  withCredentials: true
}

export class Axios {
  instance: AxiosInstance

  //默认配置baseURL等
  constructor (config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors()
  }

  private interceptors () {
    this.interceptorsRequest()
    this.interceptorsResponse()
  }

  private interceptorsRequest () {
  }

  private interceptorsResponse () {
  }

  public request<T, D = T extends Blob ? Blob : IResponseData<T>>(config: AxiosRequestConfig) {
    //request请求 返回promise对象
    return new Promise((resolve, reject) => {
        this.instance.request(config).then(res => {
            resolve(res.data)
        }).catch(err => {
            console.log("request中的err", err);
            reject(err)
        })
    }) as Promise<D>
  }

  public get<T>(url: string, config ?: AxiosRequestConfig) {
    return this.request({url, ...config, method: "GET" })
  }

  public post<T>(url: string, config ?: AxiosRequestConfig) {
    return this.request({url, ...config, method: "POST" })
  }

  public put<T>(url: string, config ?: AxiosRequestConfig) {
    return this.request({url, ...config, method: "PUT" })
  }

  public del<T>(url: string, config ?: AxiosRequestConfig) {
    return this.request({url, ...config, method: "DELETE" })
  }
}

const axiosInstance = new Axios(defaultConfig)

export default axiosInstance
