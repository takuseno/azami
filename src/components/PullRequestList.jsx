import * as React from 'react'
import * as Immutable from 'immutable'

export default class PullRequestList extends React.Component {
  createYours (pullRequests) {
    return (
      <div>
        <p>YOURS</p>
        <ul>
          {pullRequests.map((pullRequest) => {
            let number = pullRequest.number
            let title = pullRequest.title
            return (
              <li>#{number} {title}</li>
            )
          })}
        </ul>
      </div>
    )
  }

  createTheirs (pullRequests) {
    return (
      <div>
        <p>THEIRS</p>
        <ul>
          {pullRequests.map((pullRequest) => {
            let number = pullRequest.number
            let title = pullRequest.title
            return (
              <li>#{number} {title}</li>
            )
          })}
        </ul>
      </div>
    )
  }

  render () {
    let yours = Immutable.Seq(this.props.pullRequests)
      .filter((pullRequest) => this.props.user === pullRequest.user)
      .toArray()
    let theirs = Immutable.Seq(this.props.pullRequests)
      .filter((pullRequest) => this.props.user !== pullRequest.user)
      .toArray()
    return (
      <div>
        {this.createYours(yours)}
        {this.createTheirs(theirs)}
      </div>
    )
  }
}
