import * as React from 'react'
import AppActions from '../actions/AppActions'
require('../../style/selector.scss')

export default class OrganizationSelector extends React.Component {
  changeListener (e) {
    AppActions.changeOrganization(e.target.value)
  }

  render () {
    const organizations = this.props.organizations
    return (
      <div className='selector'>
        <select value={this.props.checkedValue} onChange={this.changeListener.bind(this)}>
          {organizations.map((organization, index) => {
            return (
              <option key={organization.id} value={index}>
                {organization.name}
              </option>
            )
          })}
        </select>
      </div>
    )
  }
}
