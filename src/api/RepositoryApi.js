import * as SuperAgent from 'superagent'
import BaseApi from './BaseApi'

export default class RepositoryApi extends BaseApi {
  static getAll (parameters, callback) {
    this.validate(parameters)
    let token = parameters.token
    SuperAgent.get('https://api.github.com/user/repos')
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
