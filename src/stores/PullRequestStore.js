import AppDispatcher from '../dispatcher/AppDispatcher'
import AppConstants from '../constants/AppConstants'
import { EventEmitter } from 'events'
import RepositroyStore from './RepositoryStore'
import GlobalStore from './GlobalStore'
import AppActions from '../actions/AppActions'

let CHANGE_EVENT = 'change'

let store = []

class PullRequestStore extends EventEmitter {
  getAll () {
    return store
  }

  emitChange () {
    this.emit(CHANGE_EVENT)
  }

  addChangeListener (callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener (callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }
}

let pullRequestStore = new PullRequestStore()
pullRequestStore.dispatchToken = AppDispatcher.register((action) => {
  const globalStore = GlobalStore.getAll()
  const token = globalStore.preference.token

  switch (action.actionType) {
    case AppConstants.LOAD_REPOSITORIES_COMPLETED:
      AppDispatcher.waitFor([RepositroyStore.dispatchToken])
      store = []
      pullRequestStore.emitChange()
      const repository = RepositroyStore.getAll()[0]
      setTimeout(() => {
        AppActions.loadPullRequests(token, repository)
      }, 0)
      break

    case AppConstants.LOAD_PULL_REQUESTS_COMPLETED:
      store = action.pullRequests
      pullRequestStore.emitChange()
      for (let pullRequest of store) {
        setTimeout(() => {
          AppActions.loadComments(token, pullRequest)
          AppActions.loadIssueComments(token, pullRequest)
          AppActions.loadCommits(token, pullRequest)
        }, 0)
      }
      break

    case AppConstants.LOAD_COMMENTS_COMPLETED:
      const comments = action.comments
      action.pullRequest.comments = comments
      pullRequestStore.emitChange()
      break

    case AppConstants.LOAD_ISSUE_COMMENTS_COMPLETED:
      const issueComments = action.issueComments
      action.pullRequest.issueComments = issueComments
      pullRequestStore.emitChange()
      break

    case AppConstants.LOAD_COMMITS_COMPLETED:
      const commits = action.commits
      action.pullRequest.commits = commits
      pullRequestStore.emitChange()
      break
  }
})

export default pullRequestStore
