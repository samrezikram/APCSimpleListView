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
    case AppActionsTypes.SET_ISSUES_LIST:
      return {
        ...state,
        issuesList: action.payload.issuesList
      } as IAppState;

    // ----------------------------------------------------------
    case AppActionsTypes.SET_IS_LOADING_ISSUE_LIST:
      return {
        ...state,
        isLoadingIssuesList: action.payload.isLoadingIssuesList
      } as IAppState;
    // ----------------------------------------------------------

    case AppActionsTypes.SET_ISSUES_GROUPS:
      return {
        ...state,
        issuesGroup: action.payload.issuesGroup
      } as IAppState;
    // ----------------------------------------------------------

    default:
      return state;
  }
}
