import axios, { AxiosInstance } from 'axios';

import { HttpInterceptor } from './http-interceptor';

import { IAxiosRequestConfig } from '@models/app/axios-http-request.model';
class HttpClient {

  private static instance: HttpClient;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create();
    HttpInterceptor.attach(this.axiosInstance);
  }

  // Singleton Handling ----------------------------------------------------
  static _getInstance(): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }
    return HttpClient.instance;
  }
  // -----------------------------------------------------------------------

  // Public Methods --------------------------------------------------------
  public async get(path: string, parmas: object | null): Promise<any> {
    return this.axiosInstance.get(path, {
      params: parmas,
      headers: {},
      timeout: 6000,
    } as IAxiosRequestConfig);
  }
  // --------------------

}

export const HttpService = HttpClient._getInstance();
