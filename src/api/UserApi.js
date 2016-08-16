import * as SuperAgent from 'superagent'
import BaseApi from './BaseApi'

export default class UserApi extends BaseApi {
  static getOrganizations (parameters) {
    this.validate(parameters)
    if (parameters.user === undefined) {
      throw new Error('user is required')
    }
    const token = parameters.token
    const user = parameters.user
    const url = 'https://api.github.com/user/orgs'
    return new Promise((resolve, reject) => {
      SuperAgent.get(url)
        .query({access_token: token})
        .end((err, res) => {
          if (res.ok) {
            const data = res.body
            resolve(data)
          } else {
            reject(err)
          }
        })
    })
  }
}
