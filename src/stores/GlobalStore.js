import AppDispatcher from '../dispatcher/AppDispatcher'
import AppConstants from '../constants/AppConstants'
import { EventEmitter } from 'events'
import RepositoryStore from './RepositoryStore'
import AppActions from '../actions/AppActions'

let CHANGE_EVENT = 'change'

let store = {
  currentDisplay: 'main',
  activeRepositoryIndex: 0,
  preference: {}
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
      AppActions.loadPullRequests(store.preference.token, repository)
      break

    case AppConstants.LOAD_REPOSITORIES_COMPLETED:
      AppDispatcher.waitFor([RepositoryStore.dispatchToken])
      store.activeRepositoryIndex = 0
      globalStore.emitChange()
      break

    case AppConstants.LOAD_PREFERENCE:
    case AppConstants.CHANGE_PREFERENCE:
      store.preference = action.data
      globalStore.emitChange()
      break

    case AppConstants.CLICK_PREFERENCE_BUTTON:
      if (store.currentDisplay === 'main') {
        store.currentDisplay = 'preference'
      } else {
        store.currentDisplay = 'main'
      }
      globalStore.emitChange()
      break

    case AppConstants.ERROR:
      console.log(action.err)
      break
  }
})

export default globalStore
