
import { ISagaThrownError } from '@models/app/errors.model';
import { ErrorSeverity } from '@enums/error-severity.enum';


import _ from 'lodash';

class SagaErrorHandlerClass {

  private static instance: SagaErrorHandlerClass;

  private constructor() {}

  // Singleton Handling ----------------------------------------------------
  static _getInstance(): SagaErrorHandlerClass {
    if (!SagaErrorHandlerClass.instance) {
      SagaErrorHandlerClass.instance = new SagaErrorHandlerClass();
    }
    return SagaErrorHandlerClass.instance;
  }
  // -----------------------------------------------------------------------

  // Public Methods --------------------------------------------------------
  public handleError(error: any, location: string, sagaRootName: string, showErrorAlert?: boolean, onErrorAlertDismissal?: () => void): ISagaThrownError {
    return {
      title: 'title',
      message: 'message',
      errorTranslationMatched: false,
      navigationActionHaveBeenTaken: false,
      alertActionHaveBeenTaken: false,
      fetchWeatherGlobalError: 'error'
    };
  }
  // -----------------------------------------------------------------------
}

export const SagaErrorHandler = SagaErrorHandlerClass._getInstance();