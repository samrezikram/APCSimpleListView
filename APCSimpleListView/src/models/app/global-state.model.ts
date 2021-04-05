import { ThemeName, ThemeKind } from '@enums/theme-name.enum';
import { IIssueGroup } from '@models/actions-results.model';
import { IIssueJSON } from './issue-json.model';
import { IGitHubIssuesRequest } from '@models/http/issue.model';

export interface IGlobalState {
    app: IAppState;
    theme: IThemeState;
}

export interface IAppState {
    doneInitializing?: boolean;
    totalCount?: number;
    clearPreviousGitHubIssuesItems?: boolean
    gitHubIssuesItems?: IIssueJSON[];
    isLoadingGitHubIssuesItems?: boolean;
    gitHubIssuesGroups?: IIssueGroup[];
    gitHubIssuesLoadingError?: string;
    gitHubIssuesFilter?: IGitHubIssuesRequest;
}
export interface IThemeState {
    doneInitializing?: boolean;
    isAuto?: boolean;
    themeName?: ThemeName;
    themeKind?: ThemeKind;
}
