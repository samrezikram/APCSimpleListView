import { IIssueJSON } from './../app/issue-json.model';

export interface IGitHubIssuesRequest {
  org: string,
  repo: string,
  page: number,
  per_page: number
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
  success: boolean;
  statusText: string;
  status: number | string; // 200 For Success
}
// -----------------------------------------------------------------

export interface IGithubRepoIssuesResponse extends ISuccessResponse {
  items: [IIssueJSON];
  total_count: number;
}