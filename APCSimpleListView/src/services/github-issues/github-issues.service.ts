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
  public async getRepositoryIssues(request: IGitHubIssuesRequest): Promise<IGithubRepoIssuesResponse> {
    const params: URLSearchParams = new URLSearchParams();
    params.append('is:issue', '');
    params.append('per_page', `${request.per_page}`);
    params.append('page', `${request.page}`);
    params.append('q', `repo:${request.org + '/' + request.repo}`);

    return HttpService.get('/search/issues', params);
  }
  // --------------------
}

export const GitHubService = GitHubIssuesService._getInstance();
