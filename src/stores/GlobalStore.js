import AppDispatcher from '../dispatcher/AppDispatcher'
import AppConstants from '../constants/AppConstants'
import { EventEmitter } from 'events'
import RepositoryStore from './RepositoryStore'
import PullRequestStore from './PullRequestStore'
import OrganizationStore from './OrganizationStore'
import AppActions from '../actions/AppActions'

let CHANGE_EVENT = 'change'

let store = {
  currentDisplay: 'main',
  activeOrganizationIndex: 0,
  activeRepositoryIndex: 0,
  activeLoadingCount: 0,
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
    case AppConstants.CHANGE_ORGANIZATION:
      store.activeOrganizationIndex = action.index
      store.activeRepositoryIndex = 0
      globalStore.emitChange()
      const index = action.index
      const token = store.preference.token
      const name = OrganizationStore.getAll()[index].name
      setTimeout(() => {
        if (index === 0) {
          AppActions.loadUserRepos(token, name)
        } else {
          AppActions.loadOrganizationRepos(token, name)
        }
      }, 0)
      break

    case AppConstants.CHANGE_REPOSITORY:
      store.activeRepositoryIndex = action.index
      globalStore.emitChange()
      const repository = RepositoryStore.getAll()[action.index]
      setTimeout(() => {
        AppActions.loadPullRequests(store.preference.token, repository)
      }, 0)
      break

    case AppConstants.LOAD_REPOSITORIES:
    case AppConstants.LOAD_ORGANIZATIONS:
    case AppConstants.LOAD_PULL_REQUESTS:
    case AppConstants.LOAD_COMMENTS:
    case AppConstants.LOAD_ISSUE_COMMENTS:
    case AppConstants.LOAD_COMMITS:
      AppDispatcher.waitFor([
        PullRequestStore.dispatchToken,
        RepositoryStore.dispatchToken,
        OrganizationStore.dispatchToken
      ])
      ++store.activeLoadingCount
      globalStore.emitChange()
      break

    case AppConstants.LOAD_REPOSITORIES_COMPLETED:
      store.activeRepositoryIndex = 0

    case AppConstants.LOAD_ORGANIZATIONS_COMPLETED:
    case AppConstants.LOAD_PULL_REQUESTS_COMPLETED:
    case AppConstants.LOAD_COMMENTS_COMPLETED:
    case AppConstants.LOAD_ISSUE_COMMENTS_COMPLETED:
    case AppConstants.LOAD_COMMITS_COMPLETED:
      AppDispatcher.waitFor([
        PullRequestStore.dispatchToken,
        RepositoryStore.dispatchToken,
        OrganizationStore.dispatchToken
      ])
      --store.activeLoadingCount
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
