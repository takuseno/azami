import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'
import GitHubApiUtils from '../utils/GitHubApiUtils'

const actions = {
  loadUserRepos: (token, user) => {
    AppDispatcher.dispatch({
      actionType: AppConstants.LOAD_REPOSITORIES,
      token: token,
      user: user
    })
    GitHubApiUtils.loadUserRepos(token, user)
  },

  loadOrganizationRepos: (token, organization) => {
    AppDispatcher.dispatch({
      actionType: AppConstants.LOAD_REPOSITORIES,
      token: token,
      user: organization
    })
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
    AppDispatcher.dispatch({
      actionType: AppConstants.LOAD_PULL_REQUESTS,
      token: token,
      repository: repository
    })
    GitHubApiUtils.loadPullRequests(token, repository)
  },

  loadPullRequestsCompleted: (pullRequests) => {
    AppDispatcher.dispatch({
      actionType: AppConstants.LOAD_PULL_REQUESTS_COMPLETED,
      pullRequests: pullRequests
    })
  },

  loadComments: (token, pullRequest) => {
    AppDispatcher.dispatch({
      actionType: AppConstants.LOAD_COMMENTS,
      token: token,
      pullRequest: pullRequest
    })
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
    AppDispatcher.dispatch({
      actionType: AppConstants.LOAD_ISSUE_COMMENTS,
      token: token,
      pullRequest: pullRequest
    })
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
    AppDispatcher.dispatch({
      actionType: AppConstants.LOAD_COMMITS,
      token: token,
      pullRequest: pullRequest
    })
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
    AppDispatcher.dispatch({
      actionType: AppConstants.LOAD_ORGANIZATIONS,
      user: user
    })
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
