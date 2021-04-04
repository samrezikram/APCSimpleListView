import { Subject } from 'rxjs';

import {
  IAppActionResult,
  IIssueGroup,
  IGithubIssuesSagaTriggerObject,
  ISagaTtriggerObject,
} from '@models/actions-results.model';

import { AppActionsTypes } from '@enums/actions-types.enum';
import { IIssueJSON } from '@models/app/issue-json.model';


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

export function _setIssuesList(issuesList: IIssueJSON[] | []): IAppActionResult {
  const result: IAppActionResult = {
    type: AppActionsTypes.SET_ISSUES_LIST,
    payload: {
      issuesList: issuesList
    }
  };
  return result;
}

/**
 *
 * @description This should only be called by a saga, not directly from a component
 */
export function _setIssuesGroups(issuesGroup: IIssueGroup[]): IAppActionResult {
  const result: IAppActionResult = {
  type: AppActionsTypes.SET_ISSUES_GROUPS,
    payload: {
      issuesGroup: issuesGroup
    }
  };
  return result;
}
// ----------------------
export function _setIsLoadingIssuesList(isLoadingIssues: boolean): IAppActionResult {
  const result: IAppActionResult = {
    type: AppActionsTypes.SET_IS_LOADING_ISSUE_LIST,
    payload: {
      isLoadingIssuesList: isLoadingIssues
    }
  };
  return result;
}

/* ------------------------------------------------------------------ */
/* ------------------    Saga Triggers    --------------------------- */
/* ------------------------------------------------------------------ */
export function loadIssueListAsync(organization: string, repo: string, showErrorAlerts?: boolean, onErrorAlertDismissal?: () => void): IGithubIssuesSagaTriggerObject {
  const _observable: Subject<boolean> = new Subject<boolean>();
  const result: IGithubIssuesSagaTriggerObject = {
    type: AppActionsTypes.LOAD_GITHUB_REPOSITORY_ISSUES_LIST_SAGA,
    _observable: _observable,
    promise: _observable.toPromise(),
    payload: {
      organization: organization,
      repo: repo,
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
 *
 * @description This should only be called by a saga, not directly from a component
 */


/* ------------------------------------------------------------------ */
/* ------------------    Saga Triggers    --------------------------- */
/* ------------------------------------------------------------------ */
export function initAppStateAsync(): ISagaTtriggerObject {
  return {
    type: AppActionsTypes.INIT_APP_STATE_SAGA
  };
}
// ----------------------
