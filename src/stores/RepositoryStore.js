import AppDispatcher from '../dispatcher/AppDispatcher'
import AppConstants from '../constants/AppConstants'
import { EventEmitter } from 'events'

let CHANGE_EVENT = 'change'

let store = []

class RepositoryStore extends EventEmitter {
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

let repositoryStore = new RepositoryStore()
repositoryStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case AppConstants.LOAD_REPOSITORIES_COMPLETED:
      store = action.repositories
      repositoryStore.emitChange()
      break
  }
})

export default repositoryStore
