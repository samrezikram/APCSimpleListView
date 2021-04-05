import { AxiosRequestConfig, AxiosResponse, AxiosInstance, AxiosError } from 'axios';

import { IHttpError, IGenericError, IHandledError } from '@models/app/errors.model';

import { ErrorSource } from '@enums/error-sources.enum';

import _ from 'lodash';
import { IGenericApiResponse } from '@models/http/issue.model';

class HttpClientInterceptor {

  private static instance: HttpClientInterceptor;

  private requestsInterceptor: number = 0;
  private responseInterceptor: number = 0;

  private baseUrl: string = '';

  private constructor() {
    this.baseUrl = 'https://api.github.com';
  }

  // Singleton Handling ----------------------------------------------------
  static _getInstance(): HttpClientInterceptor {
    if (!HttpClientInterceptor.instance) {
        HttpClientInterceptor.instance = new HttpClientInterceptor();
    }
    return HttpClientInterceptor.instance;
  }
  // -----------------------------------------------------------------------

  // Public Methods --------------------------------------------------------
  /**
   * @param axiosInstance An axios instance (which been generated by axios.create()) to attach the interceptors to
   * @returns void
   */
  public attach(axiosInstance: AxiosInstance): void {
    this.requestsInterceptor = axiosInstance.interceptors.request.use(this.interceptRequest.bind(this));
    this.responseInterceptor = axiosInstance.interceptors.response.use(this.interceptSuccessfulResponse.bind(this), this.interceptErrorResponse.bind(this));
  }
  // --------------------

  /**
   * @param axiosInstance An axios instance (which been generated by axios.create()) to dettach interceptors from (In case any is attached using HttpInterceptor.attach).
   * @returns void
   */
  public dettach(axiosInstance: AxiosInstance): void {
      try {
        axiosInstance.interceptors.request.eject(this.requestsInterceptor);
        axiosInstance.interceptors.response.eject(this.responseInterceptor);
      } catch (e) {}
  }
  // -----------------------------------------------------------------------

  // Interceptors ----------------------------------------------------------
  private interceptRequest(requestConfig: AxiosRequestConfig): AxiosRequestConfig {
    const interceptedRequestCongig: AxiosRequestConfig = _.cloneDeep(requestConfig);
    interceptedRequestCongig.baseURL = this.baseUrl;
    interceptedRequestCongig.headers = {...{
        'Content-Type': 'application/json',
        'Content-Length': this.getPayloadDataLength(requestConfig.data)
    }, ...(requestConfig.headers ? requestConfig.headers : {})};
    return interceptedRequestCongig;
  }
  // --------------------

  private interceptSuccessfulResponse(response: AxiosResponse): any {
    const responseData: IGenericApiResponse = response.data;
    if (responseData && response.status == 200) {
      return responseData;
    } else {
      const errorObject: IGenericError = {} as IGenericError;
      errorObject.code = response.status + '';
      errorObject.message = response.statusText;
      return this.handleHttpError(ErrorSource.GITHUB_API, errorObject);
    }
  }
  // --------------------

  private interceptErrorResponse(error: AxiosError): AxiosError | any {
      if (!error || (error && error.isAxiosError)) {
        const errorObject: IHttpError = {} as IHttpError;
        errorObject.message = `${error.response ? error.response : '--Github Issues Inferred-- Possible Failure to Connect To Server'} @ ${error.config.url}`;
        return this.handleHttpError(ErrorSource.JAVASCRIPT, errorObject);
      } else {
        if (error.code && parseInt(error.code, 10) > 200) {
          // Same as above, but in future when auth apis return error codes they will be handled here
          const errorObject: IHttpError = {} as IHttpError;
          errorObject.code = error.code;
          errorObject.message = `${'HTTP Request Error'} @ ${error.config.url}`;
          return this.handleHttpError(ErrorSource.HTTP, errorObject);
        } else {
          const errorObject: IHttpError = {} as IHttpError;
          errorObject.code = error.code;
          errorObject.message = `${error.response ? error.response : '--Github Issues Inferred-- Possible Failure to Connect To Server'} @ ${error.config.url}`;
          return this.handleHttpError(ErrorSource.HTTP, errorObject);
        }
      }
  }
  // -----------------------------------------------------------------------

  // Error Handling --------------------------------------------------------
  private async handleHttpError(errorSource: ErrorSource, errorObject: IHttpError | any): Promise<any> {
    const handledError: IHandledError = {} as IHandledError;
    handledError.source = errorSource;
    handledError.errorObject = errorObject;
    return Promise.reject(handledError);
  }
  // --------------------

  // -----------------------------------------------------------------------

  // Helpers ---------------------------------------------------------------
  private getPayloadDataLength(data: object | string | boolean): string {
    if (data && typeof data != undefined && typeof data !== null) {
      if (typeof data == 'string') {
        return data.length + '';
      } else if (typeof data == 'boolean') {
        return JSON.stringify(data).length + '';
      } else {
        try {
          return JSON.stringify(data).length + '';
        } catch (err) {
          return '0';
        }
      }
    } else {
      return '0';
    }
  }
  // -----------------------------------------------------------------------
}

export const HttpInterceptor = HttpClientInterceptor._getInstance();
