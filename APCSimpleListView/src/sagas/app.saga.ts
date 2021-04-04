import { IGitHubIssuesRequest, IGithubRepoIssuesResponse } from './../models/http/issue.model';
import { GitHubService } from './../services/github-issues/github-issues.service';
import { SagaIterator } from 'redux-saga';
import { takeLeading, takeLatest, put, call, select } from 'redux-saga/effects';
import { IFetchIssueGlobalError, ISagaThrownError } from '@models/app/errors.model';
import { IIssueJSON } from '@models/app/issue-json.model';
import { IIssueGroup, IGithubIssuesSagaTriggerObject } from '@models/actions-results.model';

import { AppActionsTypes } from '@enums/actions-types.enum';

import { emitNextAndComplete, throwError } from '@utils/rxjs-subject-safe-handler';

import { _setDoneInitilizingApp, _setIsLoadingIssuesList, _setIssuesList, _setIssuesGroups } from '@actions/app.actions';

import { SagaErrorHandler } from '@error-handlers/saga-error-handler';



import _ from 'lodash';

// User Sagas ----------------------------------------------------------------------------------

// User Sagas ----------------------------------------------------------------------------------
function* initAppStateSaga(): SagaIterator {
  yield put(_setDoneInitilizingApp(true));
}
// -------------------

function* githubRepositoryIssuesListSaga(sagaData: IGithubIssuesSagaTriggerObject): SagaIterator  {
  const sagaName: string = 'githubRepositoryIssuesListSaga';
  try {
    yield put(_setIsLoadingIssuesList(true));
    yield put(_setIssuesList([]));

    if (sagaData && sagaData.payload && sagaData.payload.organization) {
      const sendGitHubIssueRequest: IGitHubIssuesRequest = {} as IGitHubIssuesRequest;
      sendGitHubIssueRequest.organization = sagaData.payload.organization;
      sendGitHubIssueRequest.repo = sagaData.payload.repo;

      const githubIssuesResponse: IGithubRepoIssuesResponse = yield call(GitHubService.getRepositoryIssues.bind(GitHubService), sendGitHubIssueRequest);

      console.log(githubIssuesResponse);
      yield put(_setIssuesList(githubIssuesResponse.list));
      // yield call(setMealsItemsAndGroups, githubIssues);
      yield put(_setIsLoadingIssuesList(false));
      emitNextAndComplete(sagaData._observable, true);
    } else {
      yield put(_setIsLoadingIssuesList(false));
      emitNextAndComplete(sagaData._observable, false);
    }
  } catch (error) {
    yield put(_setIsLoadingIssuesList(false));
    yield put(_setIssuesList([]));
    throwError(sagaData._observable, handleError((_.isError(error) ? error : new Error), error, sagaName, sagaData.showErrorAlerts, sagaData.onErrorAlertDismissal));
  }

}
// -------------------

/**
 * This is a helper saga to avoid duplicate code in other sagas
 */
function* setMealsItemsAndGroups(items: IIssueJSON[]): SagaIterator {
  const mealsGroup: IIssueGroup[] = [];
  const groupedItems: {[mealType: string]: IIssueJSON[]} = _.groupBy(items, (item: IIssueJSON) => {
    return item.created_at;
  });
  _.each(groupedItems, (items: IIssueJSON[], mealType: string) => {
    mealsGroup.push({
        mealType: mealType,
        data: items
      } as unknown as IIssueGroup);
  });

  yield put(_setIssuesList(items));
  yield put(_setIssuesGroups(mealsGroup));

}
// ---------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------

// Root App Saga -------------------------------------------------------------------------------
export function* rootAppSaga() {
  yield takeLeading(AppActionsTypes.INIT_APP_STATE_SAGA, initAppStateSaga);
  yield takeLatest(AppActionsTypes.LOAD_GITHUB_REPOSITORY_ISSUES_LIST_SAGA , githubRepositoryIssuesListSaga);

}
// ---------------------------------------------------------------------------------------------


// Error Handling ------------------------------------------------------------------------------
function handleError(stackTraceCapturer: Error, error: any, location: string, showErrorAlert?: boolean, onErrorAlertDismissal?: () => void): ISagaThrownError {
  const errorToReport: IFetchIssueGlobalError = {} as IFetchIssueGlobalError;
  return SagaErrorHandler.handleError(errorToReport, location, 'appSaga', showErrorAlert, onErrorAlertDismissal);
}
// ---------------------------------------------------------------------------------------------
