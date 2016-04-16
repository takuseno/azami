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
  let globalStore = GlobalStore.getAll()
  let token = globalStore.preference.token
  let activeRepositoryIndex = globalStore.activeRepositoryIndex

  switch (action.actionType) {
    case AppConstants.LOAD_REPOSITORIES_COMPLETED:
      AppDispatcher.waitFor([RepositroyStore.dispatchToken])
      store = []
      pullRequestStore.emitChange()
      let repository = RepositroyStore.getAll()[activeRepositoryIndex]
      AppActions.loadPullRequests(token, repository)
      break

    case AppConstants.LOAD_PULL_REQUEST_COMPLETED:
      store = action.pullRequests
      pullRequestStore.emitChange()
      for (let pullRequest of store) {
        AppActions.loadComments(token, pullRequest)
        AppActions.loadIssueComments(token, pullRequest)
        AppActions.loadCommits(token, pullRequest)
      }
      break

    case AppConstants.LOAD_COMMENTS_COMPLETED:
      let comments = action.comments
      action.pullRequest.comments = comments
      pullRequestStore.emitChange()
      break

    case AppConstants.LOAD_ISSUE_COMMENTS_COMPLETED:
      let issueComments = action.issueComments
      action.pullRequest.issueComments = issueComments
      pullRequestStore.emitChange()
      break

    case AppConstants.LOAD_COMMITS_COMPLETED:
      let commits = action.commits
      action.pullRequest.commits = commits
      pullRequestStore.emitChange()
      break
  }
})

export default pullRequestStore
