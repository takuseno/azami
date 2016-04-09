import * as React from 'react'
import AppActions from '../actions/AppActions'

export default class RepositorySelector extends React.Component {
  changeListener (e) {
    let index = e.target.value
    AppActions.changeRepository(index)
  }

  render () {
    return (
      <select className="repositories" value={this.props.checkedValue} onChange={this.changeListener.bind(this)}>
        {this.props.repositories.map((repository, index) => {
          return (
            <option value={index}>{repository.name}</option>
          )
        })}
      </select>
    )
  }
}
