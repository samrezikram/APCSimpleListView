import { ThemeName, ThemeKind } from '@enums/theme-name.enum';
import { IIssueGroup } from '@models/actions-results.model';
import { IIssueJSON } from './issue-json.model';

export interface IGlobalState {
    app: IAppState;
    theme: IThemeState;
}

export interface IAppState {
    doneInitializing?: boolean;
    issuesList?: IIssueJSON[];
    isLoadingIssuesList?: boolean;
    issuesGroup?: IIssueGroup[];
}
export interface IThemeState {
    doneInitializing?: boolean;
    isAuto?: boolean;
    themeName?: ThemeName;
    themeKind?: ThemeKind;
}
