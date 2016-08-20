import * as Immutable from 'immutable'
import AppActions from '../actions/AppActions'
import GitHubDataUtils from './GitHubDataUtils'
import RepositoryApi from '../api/RepositoryApi'
import PullRequestApi from '../api/PullRequestApi'
import UserApi from '../api/UserApi'

export default class GitHubApiUtils {
  static loadUserRepos (token, user) {
    const parameters = {
      token: token,
      user: user
    }
    let repositories = []
    Promise.resolve(undefined).then(function loop (url) {
      RepositoryApi.getUserRepos(parameters, url)
        .then((result) => {
          const converted = Immutable.Seq(result.repositories)
            .map(GitHubDataUtils.convertRawRepository)
            .toArray()
          repositories = repositories.concat(converted)
          const nextUrl = result.nextUrl
          if (nextUrl === undefined) {
            AppActions.loadRepositoriesCompleted(repositories)
          } else {
            loop(nextUrl)
          }
        })
        .catch((e) => AppActions.error({error: e, location: 'loadUserRepos'}))
    })
  }

  static loadOrganizationRepos (token, organization) {
    const parameters = {
      token: token,
      organization: organization
    }
    let repositories = []
    Promise.resolve(undefined).then(function loop (url) {
      RepositoryApi.getOrganizationRepos(parameters, url)
        .then((result) => {
          const converted = Immutable.Seq(result.repositories)
            .map(GitHubDataUtils.convertRawRepository)
            .toArray()
          repositories = repositories.concat(converted)
          const nextUrl = result.nextUrl
          if (nextUrl === undefined) {
            AppActions.loadRepositoriesCompleted(repositories)
          } else {
            loop(nextUrl)
          }
        })
        .catch((e) => AppActions.error({error: e, location: 'loadOrganizationRepos'}))
    })
  }

  static loadPullRequests (token, repository) {
    const parameters = {
      token: token,
      owner: repository.owner,
      repository: repository.name
    }
    let pullRequests = []
    Promise.resolve(undefined).then(function loop (url) {
      PullRequestApi.getAll(parameters, url)
        .then((result) => {
          const converted = Immutable.Seq(result.pullRequests)
            .map(GitHubDataUtils.convertRawPullRequest)
            .toArray()
          pullRequests = pullRequests.concat(converted)
          const nextUrl = result.nextUrl
          if (nextUrl === undefined) {
            AppActions.loadPullRequestsCompleted(pullRequests)
          } else {
            loop(nextUrl)
          }
        })
        .catch((e) => AppActions.error({error: e, location: 'loadPullRequests'}))
    })
  }

  static loadComments (token, pullRequest) {
    const parameters = {
      token: token,
      owner: pullRequest.owner,
      repository: pullRequest.name,
      number: pullRequest.number
    }
    PullRequestApi.getComments(parameters)
      .then((comments) => {
        const converted = Immutable.Seq(comments)
          .map(GitHubDataUtils.convertRawComment)
          .toArray()
        AppActions.loadCommentsCompleted(pullRequest, converted)
      })
      .catch((e) => AppActions.error({error: e, location: 'loadComments'}))
  }

  static loadIssueComments (token, pullRequest) {
    const parameters = {
      token: token,
      owner: pullRequest.owner,
      repository: pullRequest.name,
      number: pullRequest.number
    }
    PullRequestApi.getIssueComments(parameters)
      .then((comments) => {
        const converted = Immutable.Seq(comments)
          .map(GitHubDataUtils.convertRawIssueComment)
          .toArray()
        AppActions.loadIssueCommentsCompleted(pullRequest, converted)
      })
      .catch((e) => AppActions.error({error: e, location: 'loadIssueComments'}))
  }

  static loadCommits (token, pullRequest) {
    const parameters = {
      token: token,
      owner: pullRequest.owner,
      repository: pullRequest.name,
      number: pullRequest.number
    }
    PullRequestApi.getCommits(parameters)
      .then((commits) => {
        const converted = Immutable.Seq(commits)
          .map(GitHubDataUtils.convertRawCommit)
          .toArray()
        AppActions.loadCommitsCompleted(pullRequest, converted)
      })
      .catch((e) => AppActions.error({error: e, location: 'loadCommits'}))
  }

  static loadOrganizations (token, user) {
    const parameters = {
      token: token,
      user: user
    }
    UserApi.getOrganizations(parameters)
      .then((organizations) => {
        const converted = Immutable.Seq(organizations)
          .map(GitHubDataUtils.convertRawOrganization)
          .toArray()
        AppActions.loadOrganizationsCompleted(converted)
      })
      .catch((e) => AppActions.error({error: e, location: 'loadOrganizations'}))
  }
}
