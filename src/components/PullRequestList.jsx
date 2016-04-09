import * as React from 'react'
import * as Immutable from 'immutable'
import * as Shell from 'shell'

export default class PullRequestList extends React.Component {
  createList (pullRequests) {
    return (
      <ul className='pull-requests'>
        {pullRequests.map((pullRequest) => {
          let number = pullRequest.number
          let title = pullRequest.title
          return (
            <li onClick={this.clickListener.bind(this, pullRequest)}>#{number} {title}</li>
          )
        })}
      </ul>
    )
  }

  clickListener (pullRequest) {
    let owner = pullRequest.owner
    let name = pullRequest.name
    let number = pullRequest.number
    let url = `https://github.com/${owner}/${name}/pull/${number}`
    Shell.openExternal(url)
  }

  render () {
    let yours = Immutable.Seq(this.props.pullRequests)
      .filter((pullRequest) => this.props.user === pullRequest.user)
      .toArray()
    let reviewdByYou = Immutable.Seq(this.props.pullRequests)
      .filter((pullRequest) => this.props.user !== pullRequest.user)
      .filter((pullRequest) => pullRequest.comments.length !== 0)
      .toArray()
    let notReviewd = Immutable.Seq(this.props.pullRequests)
      .filter((pullRequest) => this.props.user !== pullRequest.user)
      .filter((pullRequest) => pullRequest.comments.length === 0)
      .toArray()
    return (
      <div>
        <p className='divider'>YOURS</p>
        {this.createList(yours)}
        <p className='divider'>REVIEWED BY YOU</p>
        {this.createList(reviewdByYou)}
        <p className='divider'>NOT REVIEWED</p>
        {this.createList(notReviewd)}
      </div>
    )
  }
}
