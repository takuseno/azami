import * as React from 'react'
import RepositorySelector from './RepositorySelector'
import PullRequestList from './PullRequestList'
import GlobalStore from '../stores/GlobalStore'
import RepositoryStore from '../stores/RepositoryStore'
import PullRequestStore from '../stores/PullRequestStore'
import AppActions from '../actions/AppActions'

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
      pullRequests: []
    }
  }

  componentDidMount () {
    let token = this.state.global.token
    AppActions.loadRepositories(token)
  }

  render () {
    let repositories = this.state.repositories
    let pullRequests = this.state.pullRequests
    let checkedIndex = this.state.global.activeRepositoryIndex
    let user = this.state.global.user
    return (
      <div>
        <RepositorySelector repositories={repositories} checkedValue={checkedIndex}/>
        <PullRequestList pullRequests={pullRequests} user={user}/>
      </div>
    )
  }
}
