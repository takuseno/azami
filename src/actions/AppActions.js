import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'
import GitHubApiUtils from '../utils/GitHubApiUtils'
import GlobalStore from '../stores/GlobalStore'
import RepositoryStore from '../stores/RepositoryStore'

let actions = {
  loadRepositories: (token) => {
    GitHubApiUtils.loadRepositories(token)
  },

  loadRepositoriesCompleted: (repositories) => {
    AppDispatcher.dispatch({
      actionType: AppConstants.LOAD_REPOSITORIES_COMPLETED,
      repositories: repositories
    })
  },

  changeRepository: (index) => {
    AppDispatcher.dispatch({
      actionType: AppConstants.CHANGE_REPOSITORY,
      index: index
    })
    let token = GlobalStore.getAll().token
    let repository = RepositoryStore.getAll()[index]
    GitHubApiUtils.loadPullRequests(token, repository)
  },

  loadPullRequests: (token, repository) => {
    GitHubApiUtils.loadPullRequests(token, repository)
  },

  loadPullRequestsCompleted: (pullRequests) => {
    AppDispatcher.dispatch({
      actionType: AppConstants.LOAD_PULL_REQUEST_COMPLETED,
      pullRequests: pullRequests
    })
  },

  loadComments: (token, pullRequest) => {
    GitHubApiUtils.loadComments(token, pullRequest)
  },

  loadCommentsCompleted: (pullRequest, comments) => {
    AppDispatcher.dispatch({
      actionType: AppConstants.LOAD_COMMENTS_COMPLETED,
      pullRequest: pullRequest,
      comments: comments
    })
  },

  loadIssueComments: (token, pullRequest) => {
    GitHubApiUtils.loadIssueComments(token, pullRequest)
  },

  loadIssueCommentsCompleted: (pullRequest, issueComments) => {
    AppDispatcher.dispatch({
      actionType: AppConstants.LOAD_ISSUE_COMMENTS_COMPLETED,
      pullRequest: pullRequest,
      issueComments: issueComments
    })
  },

  error: (err) => {
    AppDispatcher.dispatch({
      actionType: AppConstants.ERROR,
      err: err
    })
  },

  loadPreference: (data) => {
    AppDispatcher.dispatch({
      actionType: AppConstants.LOAD_PREFERENCE,
      data: data
    })
  },

  changePreference: (data) => {
    AppDispatcher.dispatch({
      actionType: AppConstants.CHANGE_PREFERENCE,
      data: data
    })
  }
}

export default actions
