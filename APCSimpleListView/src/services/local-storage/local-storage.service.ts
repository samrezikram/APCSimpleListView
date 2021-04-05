import AsyncStorage from '@react-native-community/async-storage';

import { IGenericError } from '@models/app/errors.model';

import { ErrorSource } from '@enums/error-sources.enum';
import { LocalStorageKey } from '@enums/local-storage-keys.enum';

import { safelyStringifyValueForLocalStorage, safelyParseValueFromLocalStorage } from '@utils/value-stringifier-parser.util';

import _ from 'lodash';

type KeyValPair = [LocalStorageKey | string, any];

class LocalStorage {

  private static instance: LocalStorage;

  private constructor() {}

  // Singleton Handling ----------------------------------------------------------
  static _getInstance(): LocalStorage {
    if (!LocalStorage.instance) {
      LocalStorage.instance = new LocalStorage();
    }
    return LocalStorage.instance;
  }
  // -----------------------------------------------------------------------------

  // Public Async Methods --------------------------------------------------------
  /**
   * @param key String
   * @param returnParsed Boolean
   * @returns Promise<any>
   */
  public async getItem(key: LocalStorageKey | string, returnedParsed?: boolean): Promise<any> {
    return AsyncStorage.getItem(key as any).then((value: string | null) => {
      return returnedParsed ? safelyParseValueFromLocalStorage(value) : value;
    }).catch((error: IGenericError | any) => {
      return this.handleAsyncStorageError((_.isError(error) ? error : new Error), error?.message ?? 'Failed To Get Item From local Storage');
    });
  }
  // --------------------

  /**
   * @param key String
   * @param value any
   * @returns Promise<void>
   */
  public async setItem(key: LocalStorageKey | string, value: any): Promise<void> {
    const valueToSave: string = safelyStringifyValueForLocalStorage(value);
    return AsyncStorage.setItem(key as any, valueToSave).catch((error: IGenericError | any) => {
      return this.handleAsyncStorageError((_.isError(error) ? error : new Error), error?.message ?? 'Failed To Set Item In Local Storage');
    });
  }
  // --------------------

  /**
   * @param key String
   * @returns Promise<void>
   */
  public async removeItem(key: LocalStorageKey | string): Promise<void> {
    return AsyncStorage.removeItem(key as any).catch((error: IGenericError | any) => {
      return this.handleAsyncStorageError((_.isError(error) ? error : new Error), error?.message ?? 'Failed To Remove Item from Local Storage');
    });
  }
  // --------------------

 

  /**
   * @returns Promise<void>
   */
  public async clearAll(): Promise<void> {
    return AsyncStorage.clear().catch((error: IGenericError | any) => {
      return this.handleAsyncStorageError((_.isError(error) ? error : new Error), error?.message ?? 'Failed To Clear All Local Storage Items');
    });
  }
  // --------------------



  // -----------------------------------------------------------------------

  // Error Handling --------------------------------------------------------
  private async handleAsyncStorageError(stackTraceCapturer: Error, message: string): Promise<any> {
    const klipGlobalError: IGenericError = {} as IGenericError;
    klipGlobalError.source = ErrorSource.JAVASCRIPT;
    klipGlobalError.stackTraceCapturer = stackTraceCapturer;
    klipGlobalError.errorDetails = {
      code: '0',
      message: message
    } as IGenericError;
    return Promise.reject(klipGlobalError);
  }
  // -----------------------------------------------------------------------
}

export const LocalStorageService = LocalStorage._getInstance();
