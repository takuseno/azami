import * as SuperAgent from 'superagent'
import BaseApi from './BaseApi'

export default class PullRequestApi extends BaseApi {
  validate (parameters) {
    super.validate(parameters)
    if (parameters.owner === undefined) {
      throw new Error('owner is required')
    }
    if (parameters.repository === undefined) {
      throw new Error('repository is required')
    }
  }

  getAll (parameters, callback) {
    this.validate(parameters)
    let token = parameters.token
    let owner = parameters.owner
    let repository = parameters.repository
    SuperAgent.get(`https://api.github.com/repos/${owner}/${repository}/pulls`)
      .query({access_token: token})
      .end((err, res) => {
        if (res.ok) {
          callback(res.body)
        } else {
          throw new Error(err)
        }
      })
  }
  
  getComments (parameters, callback) {
    this.validate(parameters)
    if (parameters.number === undefined) {
      throw new Error('number is required');
    }
    let token = parameters.token
    let owner = parameters.owner
    let repository = parameters.repository
    let number = parameters.number
    SuperAgent.get(`https://api.github.com/respo/${owner}/${repository}/pulls/${number}/comments`)
      .query({access_token: token})
      .end((err, res) => {
        if (res.ok) {
          callback(res.body)
        } else {
          throw new Error(err)
        }
      })
  }
}
