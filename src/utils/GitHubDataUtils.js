export default class GitHubDataUtils {
  static convertRawRepository (repository) {
    return {
      id: repository.id,
      owner: repository.owner.login,
      name: repository.name
    }
  }

  static convertRawPullRequest (pullRequest) {
    return {
      id: pullRequest.id,
      owner: pullRequest.head.repo.owner.login,
      name: pullRequest.head.repo.name,
      number: pullRequest.number,
      title: pullRequest.title,
      state: pullRequest.state,
      user: pullRequest.user.login,
      comments: [],
      issueComments: [],
      commits: []
    }
  }

  static convertRawComment (comment) {
    return {
      id: comment.id,
      position: comment.position,
      originalPosition: comment.original_position,
      commitId: comment.commit_id,
      originalCommitId: comment.original_commit_id,
      user: comment.user.login,
      date: comment.created_at
    }
  }

  static convertRawIssueComment (issueComment) {
    return {
      id: issueComment.id,
      user: issueComment.user.login,
      body: issueComment.body,
      date: issueComment.created_at
    }
  }

  static convertRawCommit (commit) {
    return {
      id: commit.sha,
      date: commit.commit.committer.date
    }
  }
}
