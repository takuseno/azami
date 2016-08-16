import * as React from 'react'
import * as Storage from 'electron-json-storage'
import OrganizationSelector from './OrganizationSelector'
import RepositorySelector from './RepositorySelector'
import PullRequestList from './PullRequestList'
import GlobalStore from '../stores/GlobalStore'
import RepositoryStore from '../stores/RepositoryStore'
import PullRequestStore from '../stores/PullRequestStore'
import OrganizationStore from '../stores/OrganizationStore'
import AppActions from '../actions/AppActions'
import Preference from './Preference'
import * as ipc from '../ipc'

export default class Main extends React.Component {
  constructor (props) {
    super(props)

    GlobalStore.addChangeListener(() => {
      this.setState({
        global: GlobalStore.getAll()
      })
    })

    RepositoryStore.addChangeListener(() => {
      this.setState({
        repositories: RepositoryStore.getAll()
      })
    })

    PullRequestStore.addChangeListener(() => {
      this.setState({
        pullRequests: PullRequestStore.getAll()
      })
    })

    OrganizationStore.addChangeListener(() => {
      this.setState({
        organizations: OrganizationStore.getAll()
      })
    })

    ipc.initialize()

    this.state = {
      global: GlobalStore.getAll(),
      repositories: [],
      pullRequests: [],
      organizations: []
    }
  }

  componentDidMount () {
    Storage.get('config', (error, data) => {
      if (error) {
        console.log('error at preference')
      } else if (Object.keys(data).length !== 0) {
        AppActions.loadPreference(data)
        AppActions.loadOrganizations(data.token, data.user)
      }
    })
  }

  render () {
    const state = this.state
    const organizations = state.organizations
    const repositories = state.repositories
    const pullRequests = state.pullRequests
    const global = state.global
    const checkedOrg = global.activeOrganizationIndex
    const checkedIndex = global.activeRepositoryIndex
    const user = global.preference.user
    const currentDisplay = global.currentDisplay
    return (
      <div className='window'>
        <div className='window-content'>
          <div className='pane-group'>
            <div className='pane'>
              {currentDisplay === 'main'
                ? <div className='main'>
                  <OrganizationSelector organizations={organizations} checkedValue={checkedOrg} user={user}/>
                  <RepositorySelector repositories={repositories} checkedValue={checkedIndex}/>
                  <PullRequestList pullRequests={pullRequests} user={user}/>
                </div>
                : <Preference/>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
