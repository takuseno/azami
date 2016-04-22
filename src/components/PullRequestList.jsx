import * as React from 'react'
import * as Immutable from 'immutable'
import * as Shell from 'shell'

export default class PullRequestList extends React.Component {
  createList (pullRequests, title) {
    return (
      <ul className='list-group'>
        <li className='list-group-header'>
          <strong>{title}</strong>
        </li>
        {pullRequests.map((pullRequest) => {
          const id = pullRequest.id
          const number = pullRequest.number
          const title = pullRequest.title
          let iconType = 'icon-dot'
          if (this.hasNewCommits(pullRequest)) {
            iconType = 'icon-plus'
          }
          return (
            <li key={id} className='list-group-item' onClick={this.clickListener.bind(this, pullRequest)}>
              <div className='media-body'>
                <span className={`icon ${iconType}`}/> #{number} {title}
              </div>
            </li>
          )
        })}
      </ul>
    )
  }

  clickListener (pullRequest) {
    const owner = pullRequest.owner
    const name = pullRequest.name
    const number = pullRequest.number
    const url = `https://github.com/${owner}/${name}/pull/${number}`
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

  hasNewCommits (pullRequest) {
    const latestComment = Immutable.Seq(pullRequest.comments)
      .maxBy((comment) => comment.date)
    const latestIssueComment = Immutable.Seq(pullRequest.issueComments)
      .maxBy((issueComment) => issueComment.date)
    return !Immutable.Seq(pullRequest.commits)
      .filter((commit) => {
        if (latestComment === undefined) {
          return true
        } else {
          return commit.date > latestComment.date
        }
      })
      .filter((commit) => {
        if (latestIssueComment === undefined) {
          return true
        } else {
          return commit.date > latestIssueComment.date
        }
      })
      .isEmpty()
  }

  render () {
    const pullRequests = this.props.pullRequests
    const user = this.props.user

    const yours = Immutable.Seq(pullRequests)
      .filter((pullRequest) => user === pullRequest.user)
      .toArray()

    const reviewedByYou = Immutable.Seq(pullRequests)
      .filter((pullRequest) => user !== pullRequest.user)
      .filter((pullRequest) => {
        return this.hasUserComments(pullRequest, user) || this.hasUserIssueComments(pullRequest, user)
      })
      .toArray()

    const notReviewed = Immutable.Seq(this.props.pullRequests)
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
        {this.createList(yours, 'Yours')}
        {this.createList(reviewedByYou, 'Reviewed By You')}
        {this.createList(notReviewed, 'Not Reviewed')}
      </div>
    )
  }
}
