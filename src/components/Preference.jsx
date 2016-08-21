import * as React from 'react'
import * as Storage from 'electron-json-storage'
import AppActions from '../actions/AppActions'
require('../../style/preference.scss')

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
    const key = e.target.id
    const value = e.target.value
    const config = this.state
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
    const token = this.state.token
    const user = this.state.user
    return (
      <div className='preference'>
        <div className='form-group'>
          <button onClick={() => AppActions.clickPreferenceButton()}>
            <span className='icon icon-left-bold'></span>Back
          </button>
        </div>
        <div className='form-group'>
          <p>API Token</p>
          <input id='token' value={token} onChange={this.changeListener.bind(this)}/>
        </div>
        <div className='form-group'>
          <p>User Name</p>
          <input id='user' value={user} onChange={this.changeListener.bind(this)}/>
        </div>
      </div>
    )
  }
}
