import React from 'react'
import AppActions from '../actions/AppActions'

export default class Header extends React.Component {
  clickListener () {
    AppActions.clickPreferenceButton()
  }

  render () {
    return (
      <div className='header'>
        <button className='btn btn-default pull-right' onClick={this.clickListener}>
          <span className='icon icon-cog'></span>
        </button>
      </div>
    )
  }
}
