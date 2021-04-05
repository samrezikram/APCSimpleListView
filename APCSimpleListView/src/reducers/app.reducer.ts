import { AppActionsTypes } from '@enums/actions-types.enum';
import { IAppActionResult } from '@models/actions-results.model';
import { IAppState } from '@models/app/global-state.model';

import { initialState } from '@store/initial-state';

export function appReducer(state: IAppState = initialState.app, action: IAppActionResult): IAppState {
  switch (action.type) {

    case AppActionsTypes.SET_DONE_INITIALIZING_APP:
      return {
        ...state,
        doneInitializing: action.payload.doneInitializing
      } as IAppState;
    // ----------------------------------------------------------
    case AppActionsTypes.SET_GITHUB_ISSUES_ITEMS:
      return {
        ...state,
        gitHubIssuesItems: action.payload.gitHubIssuesItems
      } as IAppState;

    // ----------------------------------------------------------
    case AppActionsTypes.SET_IS_LOADING_GITHUB_ISSUE_ITEMS:
      return {
        ...state,
        isLoadingGitHubIssuesItems: action.payload.isLoadingGitHubIssuesItems
      } as IAppState;
    // ----------------------------------------------------------

    case AppActionsTypes.SET_GITHUB_ISSUES_GROUPS:
      return {
        ...state,
        gitHubIssuesGroups: action.payload.gitHubIssuesGroups
      } as IAppState;
    // ----------------------------------------------------------

    case AppActionsTypes.SET_GITHUB_ISSUES_FILTER:
      return {
        ...state,
        gitHubIssuesFilter: action.payload.gitHubIssuesFilter
      } as IAppState;
    // ----------------------------------------------------------

    case AppActionsTypes.SET_TOTAL_GITHUB_ISSUES_COUNT:
      return {
        ...state,
        totalCount: action.payload.totalCount
      } as IAppState;
    // ----------------------------------------------------------

    case AppActionsTypes.SET_GITHUB_ISSUES_LOADING_ERROR:
      return {
        ...state,
        gitHubIssuesLoadingError: action.payload.gitHubIssuesLoadingError
      } as IAppState;
    // ----------------------------------------------------------

    
    default:
      return state;
  }
}
