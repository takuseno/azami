import * as Immutable from 'immutable'
import AppActions from '../actions/AppActions'
import GitHubDataUtils from './GitHubDataUtils'
import RepositoryApi from '../api/RepositoryApi'
import PullRequestApi from '../api/PullRequestApi'

export default class GitHubApiUtils {
  static loadRepositories (token) {
    let parameters = {
      token: token
    }
    try {
      RepositoryApi.getAll(parameters, (repositories) => {
        let converted = Immutable.Seq(repositories)
          .map(GitHubDataUtils.convertRawRepository)
          .toArray()
        AppActions.loadRepositoriesCompleted(converted)
      })
    } catch (e) {
      AppActions.error(e)
    }
  }

  static loadPullRequests (token, repository) {
    let parameters = {
      token: token,
      owner: repository.owner,
      repository: repository.name
    }
    try {
      PullRequestApi.getAll(parameters, (pullRequests) => {
        let converted = Immutable.Seq(pullRequests)
          .map(GitHubDataUtils.convertRawPullRequest)
          .toArray()
        AppActions.loadPullRequestsCompleted(converted)
      })
    } catch (e) {
      AppActions.error(e)
    }
  }

  static loadComments (token, pullRequest) {
    let parameters = {
      token: token,
      owner: pullRequest.owner,
      repository: pullRequest.name,
      number: pullRequest.number
    }
    try {
      PullRequestApi.getComments(parameters, (comments) => {
        let converted = Immutable.Seq(comments)
          .map(GitHubDataUtils.convertRawComment)
          .toArray()
        AppActions.loadCommentsCompleted(converted)
      })
    } catch (e) {
      AppActions.error(e)
    }
  }
}
