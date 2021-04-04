import { IGlobalState, IAppState, IThemeState } from '@models/app/global-state.model';
import { ThemeName, ThemeKind } from '@enums/theme-name.enum';

// App State ------------------------------------
const appState: IAppState = {
    doneInitializing: false,
    issuesList: [],
    isLoadingIssuesList: false,
    issuesGroup: []
};
// ----------------------------------------------

// Theme State ----------------------------------
const themeState: IThemeState = {
    doneInitializing: false,
    isAuto: false,
    themeName: ThemeName.Light,
    themeKind: ThemeKind.Light
};
// ----------------------------------------------

export const initialState: IGlobalState = {
    app: appState,
    theme: themeState
};
