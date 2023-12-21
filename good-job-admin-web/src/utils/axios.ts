import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'

const defaultConfig = {
  baseUrl: import.meta.env.VITE_APP_BASE_URL
}

export class Axios {
  instance: AxiosInstance

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

  public get<T>(url: string, config ?: AxiosRequestConfig) {
    console.log('get')
    // return this.request<T>({url, ...config, method: 'GET'})
  }

  // public request<T, D = T extends Blob ?Blob : IResponseData<T>>(config: AxiosRequestConfig) {

  // }
}

const axiosInstance = new Axios(defaultConfig)

export default axiosInstance
