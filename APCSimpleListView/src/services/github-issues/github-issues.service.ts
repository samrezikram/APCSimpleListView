import { IGithubRepoIssuesResponse, IGitHubIssuesRequest } from '@models/http/issue.model';
import { HttpService } from '@services/http/http.service';


class GitHubIssuesService {

  private static instance: GitHubIssuesService;

  private constructor() {}

  // Singleton Handling ----------------------------------------------------
  static _getInstance(): GitHubIssuesService {
    if (!GitHubIssuesService.instance) {
      GitHubIssuesService.instance = new GitHubIssuesService();
    }
    return GitHubIssuesService.instance;
  }
  // -----------------------------------------------------------------------

  // Public Methods --------------------------------------------------------
  public async getRepositoryIssues(githubIssuesRequest: IGitHubIssuesRequest): Promise<IGithubRepoIssuesResponse> {
    const requestQeryParams: object = {
    };
    const additionalHeaders: {[headerName: string]: string} = {};
    return HttpService.get(githubIssuesRequest.organization + '/' + githubIssuesRequest.repo + '/issues' , requestQeryParams);
  }
  // --------------------
}

export const GitHubService = GitHubIssuesService._getInstance();
