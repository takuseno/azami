import AppDispatcher from '../dispatcher/AppDispatcher'
import AppConstants from '../constants/AppConstants'
import { EventEmitter } from 'events'
import RepositoryStore from './RepositoryStore'
import AppActions from '../actions/AppActions'

let CHANGE_EVENT = 'change'

let store = {
  token: '',
  user: '',
  activeRepositoryIndex: 0
}

class GlobalStore extends EventEmitter {
  getAll () {
    return store
  }

  getToken () {
    return store.token
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

let globalStore = new GlobalStore()
globalStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case AppConstants.CHANGE_REPOSITORY:
      store.activeRepositoryIndex = action.index
      globalStore.emitChange()
      let repository = RepositoryStore.getAll()[action.index]
      AppActions.loadPullRequests(store.token, repository)
      break

    case AppConstants.LOAD_REPOSITORIES_COMPLETED:
      AppDispatcher.waitFor([RepositoryStore.dispatchToken])
      store.activeRepositoryIndex = 0
      globalStore.emitChange()
      break

    case AppConstants.ERROR:
      console.log(action.err)
      break
  }
})

export default globalStore
