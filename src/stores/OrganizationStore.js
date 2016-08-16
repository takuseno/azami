import AppDispatcher from '../dispatcher/AppDispatcher'
import AppConstants from '../constants/AppConstants'
import AppActions from '../actions/AppActions'
import { EventEmitter } from 'events'
import GlobalStore from './GlobalStore'

let CHANGE_EVENT = 'change'

let store = []

class OrganizationStore extends EventEmitter {
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

let organizationStore = new OrganizationStore()
organizationStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case AppConstants.LOAD_ORGANIZATIONS_COMPLETED:
      store = action.organizations
      store.unshift({
        id: 0,
        name: GlobalStore.getAll().preference.user,
        avatorUrl: null
      })
      organizationStore.emitChange()
      const preference = GlobalStore.getAll().preference
      AppActions.loadUserRepos(preference.token, preference.user)
      break
  }
})

export default organizationStore
