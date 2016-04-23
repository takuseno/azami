import * as SuperAgent from 'superagent'
import BaseApi from './BaseApi'

export default class RepositoryApi extends BaseApi {
  static getAll (parameters, overrideUrl) {
    this.validate(parameters)
    const token = parameters.token
    let url = 'https://api.github.com/user/repos'
    if (overrideUrl !== undefined) {
      url = overrideUrl
    }
    return new Promise((resolve, reject) => {
      SuperAgent.get(url)
        .query({access_token: token})
        .end((err, res) => {
          if (res.ok) {
            const data = res.body
            const nextUrl = res.links.next
            resolve({repositories: data, nextUrl: nextUrl})
          } else {
            reject(err)
          }
        })
    })
  }
}
