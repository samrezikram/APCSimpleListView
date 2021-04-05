import { Subject } from 'rxjs';

import { GlobalActionsTypes, AppActionsTypes, ThemesActionsTypes } from '@enums/actions-types.enum';
import { ThemeName } from '@enums/theme-name.enum';
import { IAppState, IThemeState } from './app/global-state.model';
import { IIssueJSON } from './app/issue-json.model';


// Global ------------------------------------------------------------------------------------------------------
// Actions ---------------
export interface IGlobalActionResult {
  type: GlobalActionsTypes;
}

// -------------------------------------------------------------------------------------------------------------

// App ---------------------------------------------------------------------------------------------------------
// Actions ---------------
export interface IAppActionResult {
  type: AppActionsTypes;
  payload: IAppState;
}

// Sagas -----------------
// ----------
export interface IGithubIssuesSagaTriggerObject extends ISagaTriggerObject {
  _observable: Subject<boolean>;
  promise: Promise<boolean>;
  payload: {
    clearPreviousGitHubIssuesItems?: boolean;
    organization?: string;
    repo?: string;
  }
}

export interface IIssueGroup {
  date: string;
  data: IIssueJSON[];
}

// -------------------------------------------------------------------------------------------------------------

// Themes ------------------------------------------------------------------------------------------------------
// Actions ---------------
export interface IThemeActionResult {
  type: ThemesActionsTypes;
  payload: IThemeState;
}

// Saga Trigger ------------------------------------------------------------------------------------------------
export interface ISagaTriggerObject {
  type: GlobalActionsTypes | AppActionsTypes | ThemesActionsTypes;
  showErrorAlerts?: boolean;
  onErrorAlertDismissal?: () => void;
}
// -------------------------------------------------------------------------------------------------------------
