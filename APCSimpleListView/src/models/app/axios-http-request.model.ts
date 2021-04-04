import { AxiosRequestConfig } from 'axios';
export interface IAxiosRequestConfig extends AxiosRequestConfig {
  isAuthenticated?: boolean;
}
