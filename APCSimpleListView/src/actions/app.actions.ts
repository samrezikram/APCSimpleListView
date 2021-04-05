import { Subject } from 'rxjs';

import {
  IAppActionResult,
  IIssueGroup,
  IGithubIssuesSagaTriggerObject,
  ISagaTriggerObject,
} from '@models/actions-results.model';

import { AppActionsTypes } from '@enums/actions-types.enum';
import { IIssueJSON } from '@models/app/issue-json.model';
import { IGitHubIssuesRequest } from '@models/http/issue.model';


//  @description This should only be called by a saga, not directly from a component

/* ------------------------------------------------------------------ */
/* ---------------------    Actions    ------------------------------ */
/* ------------------------------------------------------------------ */
/**
 *
 * @description This should only be called by a saga, not directly from a component
 */
export function _setDoneInitilizingApp(done: boolean): IAppActionResult {
  const result: IAppActionResult = {
    type: AppActionsTypes.SET_DONE_INITIALIZING_APP,
    payload: {
      doneInitializing: done
    }
  };
  return result;
}
// ----------------------

export function _setIsLoadingGitHubIssuesItems(isLoadingGitHubItems: boolean): IAppActionResult {
  const result: IAppActionResult = {
    type: AppActionsTypes.SET_IS_LOADING_GITHUB_ISSUE_ITEMS,
    payload: {
      isLoadingGitHubIssuesItems: isLoadingGitHubItems
    }
  };
  return result;
}
// ----------------------

export function _setTotalGitHubIssuesCount(count: number): IAppActionResult {
  const result: IAppActionResult = {
    type: AppActionsTypes.SET_TOTAL_GITHUB_ISSUES_COUNT,
    payload: {
      totalCount: count,
    }
  };
  return result;
}
// ----------------------

export function _setGitHubIssuesItems(gitHubIssuesItems: IIssueJSON[]): IAppActionResult {
  const result: IAppActionResult = {
    type: AppActionsTypes.SET_GITHUB_ISSUES_ITEMS,
    payload: {
      gitHubIssuesItems: gitHubIssuesItems
    }
  };
  return result;
}
// ----------------------

export function _setGitHubIssuesGroups(gitHubIssuesGroups: IIssueGroup[]): IAppActionResult {
  const result: IAppActionResult = {
  type: AppActionsTypes.SET_GITHUB_ISSUES_GROUPS,
    payload: {
      gitHubIssuesGroups: gitHubIssuesGroups
    }
  };
  return result;
}
// ----------------------

export function _setGitHubLoadingError(error: string): IAppActionResult {
  const result: IAppActionResult = {
    type: AppActionsTypes.SET_GITHUB_ISSUES_LOADING_ERROR,
    payload: {
      gitHubIssuesLoadingError: error
    }
  };
  return result;
}
// ----------------------

/* ------------------------------------------------------------------ */
/* ------------------    Saga Triggers    --------------------------- */
/* ------------------------------------------------------------------ */
export function loadGitHubIssueItemsAsync(clearPreviousGitHubIssuesItems?: boolean, organization?: string, repo?: string,  showErrorAlerts?: boolean, onErrorAlertDismissal?: () => void): IGithubIssuesSagaTriggerObject {
  const _observable: Subject<boolean> = new Subject<boolean>();
  const result: IGithubIssuesSagaTriggerObject = {
    type: AppActionsTypes.LOAD_GITHUB_REPOSITORY_ISSUES_LIST_SAGA,
    _observable: _observable,
    promise: _observable.toPromise(),
    payload: {
      clearPreviousGitHubIssuesItems: clearPreviousGitHubIssuesItems,
      organization: organization,
      repo: repo
    },
    showErrorAlerts: showErrorAlerts,
    onErrorAlertDismissal: onErrorAlertDismissal
  };
  return result;
}
// ---------------------------------------------------------------------



/* ------------------------------------------------------------------ */
/* ---------------------    Actions    ------------------------------ */
/* ------------------------------------------------------------------ */
/**
 *
 * @description This should only be called by a saga, not directly from a component
 */
 
export function setGitHubIssuesFilter(githubIssuesFilter: IGitHubIssuesRequest): IAppActionResult {
  const result: IAppActionResult = {
    type: AppActionsTypes.SET_GITHUB_ISSUES_FILTER,
    payload: {
      gitHubIssuesFilter: githubIssuesFilter
    }
  };
  return result;
}
// ----------------------


/* ------------------------------------------------------------------ */
/* ------------------    Saga Triggers    --------------------------- */
/* ------------------------------------------------------------------ */
export function initAppStateAsync(): ISagaTriggerObject {
  return {
    type: AppActionsTypes.INIT_APP_STATE_SAGA
  };
}
// ----------------------
