import * as SuperAgent from 'superagent'
import BaseApi from './BaseApi'

export default class RepositoryApi extends BaseApi {
  static getAll (parameters) {
    this.validate(parameters)
    let token = parameters.token
    return new Promise((resolve, reject) => {
      SuperAgent.get('https://api.github.com/user/repos')
        .query({access_token: token})
        .end((err, res) => {
          if (res.ok) {
            resolve(res.body)
          } else {
            reject(err)
          }
        })
    })
  }
}
