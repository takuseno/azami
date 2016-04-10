import * as React from 'react'
import * as Storage from 'electron-json-storage'
import AppActions from '../actions/AppActions'

export default class Preference extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      token: '',
      user: ''
    }
  }

  componentDidMount () {
    Storage.get('config', (error, data) => {
      if (error) {
        console.log('error at preference')
      } else if (Object.keys(data).length !== 0) {
        this.setState(data)
      }
    })
  }

  changeListener (e) {
    let key = e.target.id
    let value = e.target.value
    let config = this.state
    config[key] = value
    Storage.set('config', config, (error) => {
      if (error) {
        console.log('error at setting preference')
      }
    })
    this.setState(config)
    AppActions.changePreference(config)
  }

  render () {
    let token = this.state.token
    let user = this.state.user
    return (
      <div className='preference'>
        <p className='divider'>API TOKEN</p>
        <input id='token' value={token} onChange={this.changeListener.bind(this)}/>
        <p className='divider'>USER NAME</p>
        <input id='user' value={user} onChange={this.changeListener.bind(this)}/>
      </div>
    )
  }
}
