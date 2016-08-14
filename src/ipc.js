import {ipcRenderer} from 'electron'
import AppActions from './actions/AppActions'

export function initialize () {
  ipcRenderer.on('clickPreference', (event, message) => {
    AppActions.clickPreferenceButton()
  })
}
