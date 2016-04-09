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
  switch (action.actionType) {
    case AppConstants.LOAD_REPOSITORIES_COMPLETED:
      AppDispatcher.waitFor([RepositroyStore.dispatchToken])
      store = []
      pullRequestStore.emitChange()
      let globalStore = GlobalStore.getAll()
      let repository = RepositroyStore.getAll()[globalStore.activeRepositoryIndex]
      AppActions.loadPullRequests(globalStore.token, repository)
      break

    case AppConstants.LOAD_PULL_REQUEST_COMPLETED:
      store = action.pullRequests
      pullRequestStore.emitChange()
      break
  }
})

export default pullRequestStore
