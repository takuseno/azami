import * as React from 'react'
import * as Immutable from 'immutable'
import * as Shell from 'shell'

export default class PullRequestList extends React.Component {
  createList (pullRequests) {
    return (
      <ul className='pull-requests'>
        {pullRequests.map((pullRequest) => {
          let id = pullRequest.id
          let number = pullRequest.number
          let title = pullRequest.title
          return (
            <li key={id} onClick={this.clickListener.bind(this, pullRequest)}>#{number} {title}</li>
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

  hasUserComments (pullRequest, user) {
    return !Immutable.Seq(pullRequest.comments)
      .filter((comment) => user === comment.user)
      .isEmpty()
  }

  hasUserIssueComments (pullRequest, user) {
    return !Immutable.Seq(pullRequest.issueComments)
      .filter((issueComment) => user === issueComment.user)
      .isEmpty()
  }

  render () {
    let pullRequests = this.props.pullRequests
    let user = this.props.user
    let yours = Immutable.Seq(pullRequests)
      .filter((pullRequest) => user === pullRequest.user)
      .toArray()

    let reviewedByYou = Immutable.Seq(pullRequests)
      .filter((pullRequest) => user !== pullRequest.user)
      .filter((pullRequest) => {
        return this.hasUserComments(pullRequest, user) || this.hasUserIssueComments(pullRequest, user)
      })
      .toArray()

    let notReviewed = Immutable.Seq(this.props.pullRequests)
      .filter((pullRequest) => user !== pullRequest.user)
      .filter((pullRequest) => pullRequest.comments.length === 0)
      .filter((pullRequest) => {
        return Immutable.Seq(pullRequest.issueComments)
          .filter((issueComment) => pullRequest.user !== issueComment.user)
          .isEmpty()
      })
      .toArray()

    return (
      <div>
        <p className='divider'>YOURS</p>
        {this.createList(yours)}
        <p className='divider'>REVIEWED BY YOU</p>
        {this.createList(reviewedByYou)}
        <p className='divider'>NOT REVIEWED</p>
        {this.createList(notReviewed)}
      </div>
    )
  }
}
