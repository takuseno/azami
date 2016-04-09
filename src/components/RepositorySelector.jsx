import * as React from 'react'
import AppActions from '../actions/AppActions'

export default class RepositorySelector extends React.Component {
  constructor (props) {
    super(props)
    this.state = props
  }

  changeListener (e) {
    let index = e.target.value
    this.setState({checkedValue: index})
    AppActions.changeRepository(index)
  }

  render () {
    return (
      <select value={this.state.checkedValue} onChange={this.changeListener.bind(this)}>
        {this.props.repositories.map((repository, index) => {
          return (
            <option value={index}>{repository.name}</option>
          )
        })}
      </select>
    )
  }
}
