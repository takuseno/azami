import * as Immutable from 'immutable'
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
      let token = GlobalStore.getAll().token
      for (let pullRequest of store) {
        AppActions.loadComments(token, pullRequest)
      }
      break

    case AppConstants.LOAD_COMMENTS_COMPLETED:
      let user = GlobalStore.getAll().user
      if (action.pullRequest.user !== user) {
        let hasYourComments = !Immutable.Seq(action.comments)
          .filter((comment) => comment.user === user)
          .isEmpty()
        if (!hasYourComments) {
          store = Immutable.Seq(store)
            .filterNot((pullRequest) => pullRequest.id === action.pullRequest.id)
            .toArray()
        }
      }
      pullRequestStore.emitChange()
      break
  }
})

export default pullRequestStore
