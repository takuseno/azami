import * as SuperAgent from 'superagent'
import BaseApi from './BaseApi'

export default class RepositoryApi extends BaseApi {
  static getUserRepos (parameters, overrideUrl) {
    this.validate(parameters)
    const token = parameters.token
    const user = parameters.user
    let url = [
      'https://api.github.com/users',
      user,
      'repos?type=all'
    ].join('/')
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

  static getOrganizationRepos (parameters, overrideUrl) {
    this.validate(parameters)
    const token = parameters.token
    const organization = parameters.organization
    let url = [
      'https://api.github.com/orgs',
      organization,
      'repos'
    ].join('/')
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
