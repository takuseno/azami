import * as React from 'react'
import AppActions from '../actions/AppActions'
require('../../style/selector.scss')

export default class RepositorySelector extends React.Component {
  changeListener (e) {
    AppActions.changeRepository(e.target.value)
  }

  render () {
    return (
      <div className='selector'>
        <select value={this.props.checkedValue} onChange={this.changeListener.bind(this)}>
          {this.props.repositories.map((repository, index) => {
            return (
              <option key={repository.id} value={index}>{repository.name}</option>
            )
          })}
        </select>
      </div>
    )
  }
}
