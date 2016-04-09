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
      user: pullRequest.user.login
    }
  }

  static convertRawComment (comment) {
    return {
      position: comment.position,
      originalPosition: comment.original_position,
      user: comment.user.login
    }
  }
}
