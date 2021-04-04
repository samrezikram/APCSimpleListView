import { IIssueJSON } from './../app/issue-json.model';

export interface IGitHubIssuesRequest {
  organization: string,
  repo: string
}
// --------------

export interface IGenericApiResponse {
  list: IIssueJSON[];
  status: number | string; // 0 For Success
  statusText: number | string;
  ActionsNeeded: ICodeMessage;
}

export interface ICodeMessage {
  Code: number;
  Message: string;
}
// -----------------------------------------------------------------


export interface IErrorResponse {
  errorCode: number;
  errorMessage: string;
}
// -----------------------------------------------------------------

export interface IBaseRequestModel {
  mobile: string;
  applicationFingerprint: string;
}
// -----------------------------------------------------------------

export interface ISuccessResponse {
  list: IIssueJSON[];
  success: boolean;
  statusText: string;
  status: number | string; // 200 For Success
}
// -----------------------------------------------------------------

export interface IGithubRepoIssuesResponse extends ISuccessResponse {}