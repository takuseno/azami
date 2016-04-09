import * as React from 'react'
import * as Storage from 'electron-json-storage'
import RepositorySelector from './RepositorySelector'
import PullRequestList from './PullRequestList'
import GlobalStore from '../stores/GlobalStore'
import RepositoryStore from '../stores/RepositoryStore'
import PullRequestStore from '../stores/PullRequestStore'
import AppActions from '../actions/AppActions'
import Preference from './Preference'

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

    this.state = {
      global: GlobalStore.getAll(),
      repositories: [],
      pullRequests: [],
      settingToggle: 0
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

  clickListener () {
    // temporary implementation
    let toggle = this.state.settingToggle
    this.setState({settingToggle: toggle === 1 ? 0 : 1})
    if (toggle === 0) {
      AppActions.loadRepositories(this.state.global.preference.token)
    }
  }

  render () {
    let repositories = this.state.repositories
    let pullRequests = this.state.pullRequests
    let checkedIndex = this.state.global.activeRepositoryIndex
    let user = this.state.global.preference.user
    return (
      <div>
        <div className='header'>
          <img className='settings-button' src='./resources/ic_settings_black_24px.svg' onClick={this.clickListener.bind(this)}/>
        </div>
        {this.state.settingToggle === 0
          ? <div>
            <RepositorySelector repositories={repositories} checkedValue={checkedIndex}/>
            <PullRequestList pullRequests={pullRequests} user={user}/>
          </div>
          : <Preference/>
        }
      </div>
    )
  }
}
