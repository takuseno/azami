import * as React from 'react'
import * as Storage from 'electron-json-storage'
import RepositorySelector from './RepositorySelector'
import PullRequestList from './PullRequestList'
import GlobalStore from '../stores/GlobalStore'
import RepositoryStore from '../stores/RepositoryStore'
import PullRequestStore from '../stores/PullRequestStore'
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

    ipc.initialize()

    this.state = {
      global: GlobalStore.getAll(),
      repositories: [],
      pullRequests: []
    }
  }

  componentDidMount () {
    Storage.get('config', (error, data) => {
      if (error) {
        console.log('error at preference')
      } else if (Object.keys(data).length !== 0) {
        AppActions.loadPreference(data)
        AppActions.loadRepositories(data.token)
      }
    })
  }

  render () {
    const repositories = this.state.repositories
    const pullRequests = this.state.pullRequests
    const checkedIndex = this.state.global.activeRepositoryIndex
    const user = this.state.global.preference.user
    const currentDisplay = this.state.global.currentDisplay
    return (
      <div className='window'>
        <div className='window-content'>
          <div className='pane-group'>
            <div className='pane'>
              {currentDisplay === 'main'
                ? <div className='main'>
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
