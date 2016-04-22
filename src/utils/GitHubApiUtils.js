import * as Immutable from 'immutable'
import AppActions from '../actions/AppActions'
import GitHubDataUtils from './GitHubDataUtils'
import RepositoryApi from '../api/RepositoryApi'
import PullRequestApi from '../api/PullRequestApi'

export default class GitHubApiUtils {
  static loadRepositories (token) {
    const parameters = {
      token: token
    }
    try {
      RepositoryApi.getAll(parameters)
        .then((repositories) => {
          const converted = Immutable.Seq(repositories)
            .map(GitHubDataUtils.convertRawRepository)
            .toArray()
          AppActions.loadRepositoriesCompleted(converted)
        })
    } catch (e) {
      AppActions.error(e)
    }
  }

  static loadPullRequests (token, repository) {
    const parameters = {
      token: token,
      owner: repository.owner,
      repository: repository.name
    }
    try {
      PullRequestApi.getAll(parameters)
        .then((pullRequests) => {
          const converted = Immutable.Seq(pullRequests)
            .map(GitHubDataUtils.convertRawPullRequest)
            .toArray()
          AppActions.loadPullRequestsCompleted(converted)
        })
    } catch (e) {
      AppActions.error(e)
    }
  }

  static loadComments (token, pullRequest) {
    const parameters = {
      token: token,
      owner: pullRequest.owner,
      repository: pullRequest.name,
      number: pullRequest.number
    }
    try {
      PullRequestApi.getComments(parameters)
        .then((comments) => {
          const converted = Immutable.Seq(comments)
            .map(GitHubDataUtils.convertRawComment)
            .toArray()
          AppActions.loadCommentsCompleted(pullRequest, converted)
        })
    } catch (e) {
      AppActions.error(e)
    }
  }

  static loadIssueComments (token, pullRequest) {
    const parameters = {
      token: token,
      owner: pullRequest.owner,
      repository: pullRequest.name,
      number: pullRequest.number
    }
    try {
      PullRequestApi.getIssueComments(parameters)
        .then((comments) => {
          const converted = Immutable.Seq(comments)
            .map(GitHubDataUtils.convertRawIssueComment)
            .toArray()
          AppActions.loadIssueCommentsCompleted(pullRequest, converted)
        })
    } catch (e) {
      AppActions.error(e)
    }
  }

  static loadCommits (token, pullRequest) {
    const parameters = {
      token: token,
      owner: pullRequest.owner,
      repository: pullRequest.name,
      number: pullRequest.number
    }
    try {
      PullRequestApi.getCommits(parameters)
        .then((commits) => {
          const converted = Immutable.Seq(commits)
            .map(GitHubDataUtils.convertRawCommit)
            .toArray()
          AppActions.loadCommitsCompleted(pullRequest, converted)
        })
    } catch (e) {
      AppActions.error(e)
    }
  }
}
