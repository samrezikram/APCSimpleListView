import { IGlobalState, IAppState, IThemeState } from '@models/app/global-state.model';
import { ThemeName, ThemeKind } from '@enums/theme-name.enum';
import { IGitHubIssuesRequest } from '@models/http/issue.model';

// App State ------------------------------------
export function getInitialAppState(): IAppState  {
    return {
        doneInitializing: false,
        totalCount: 0,
        clearPreviousGitHubIssuesItems: false,
        gitHubIssuesItems: [],
        isLoadingGitHubIssuesItems: false,
        gitHubIssuesGroups: [],
        gitHubIssuesFilter: {
            org: '',
            repo: '',
            page: 1,
            per_page: 10,
        } as IGitHubIssuesRequest,
        gitHubIssuesLoadingError: '',
    };
}
// ----------------------------------------------

// Theme State ----------------------------------
export function getInitialThemeState(): IThemeState {
    return {
        doneInitializing: false,
        isAuto: false,
        themeName: ThemeName.Light,
        themeKind: ThemeKind.Light
    };
}
// ----------------------------------------------

export const initialState: IGlobalState = {
    app: getInitialAppState(),
    theme: getInitialThemeState()
};
