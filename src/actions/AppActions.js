import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'
import GitHubApiUtils from '../utils/GitHubApiUtils'

const actions = {
  loadUserRepos: (token, user) => {
    GitHubApiUtils.loadUserRepos(token, user)
  },

  loadOrganizationRepos: (token, organization) => {
    GitHubApiUtils.loadOrganizationRepos(token, organization)
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
  },

  changeOrganization: (index) => {
    AppDispatcher.dispatch({
      actionType: AppConstants.CHANGE_ORGANIZATION,
      index: index
    })
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

  loadCommits: (token, pullRequest) => {
    GitHubApiUtils.loadCommits(token, pullRequest)
  },

  loadCommitsCompleted: (pullRequest, commits) => {
    AppDispatcher.dispatch({
      actionType: AppConstants.LOAD_COMMITS_COMPLETED,
      pullRequest: pullRequest,
      commits: commits
    })
  },

  loadOrganizations: (token, user) => {
    GitHubApiUtils.loadOrganizations(token, user)
  },

  loadOrganizationsCompleted: (organizations) => {
    AppDispatcher.dispatch({
      actionType: AppConstants.LOAD_ORGANIZATIONS_COMPLETED,
      organizations: organizations
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
  },

  clickPreferenceButton: () => {
    AppDispatcher.dispatch({
      actionType: AppConstants.CLICK_PREFERENCE_BUTTON
    })
  }
}

export default actions
