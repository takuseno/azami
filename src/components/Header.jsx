import React from 'react'
import AppActions from '../actions/AppActions'

export default class Header extends React.Component {
  clickListener () {
    AppActions.clickPreferenceButton()
  }

  render () {
    return (
      <header className='toolbar toolbar-header'>
        <h1 className='title'>azami</h1>
        <div className='toolbar-actions'>
          <button className='btn btn-default pull-right' onClick={this.clickListener}>
            <span className='icon icon-cog'></span>
          </button>
        </div>
      </header>
    )
  }
}
