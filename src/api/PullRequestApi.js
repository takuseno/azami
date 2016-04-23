import * as SuperAgent from 'superagent'
import BaseApi from './BaseApi'

export default class PullRequestApi extends BaseApi {
  static validate (parameters) {
    super.validate(parameters)
    if (parameters.owner === undefined) {
      throw new Error('owner is required')
    }
    if (parameters.repository === undefined) {
      throw new Error('repository is required')
    }
  }

  static getAll (parameters, overrideUrl) {
    this.validate(parameters)
    const token = parameters.token
    const owner = parameters.owner
    const repository = parameters.repository
    let url = `https://api.github.com/repos/${owner}/${repository}/pulls`
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
            resolve({pullRequests: data, nextUrl: nextUrl})
          } else {
            reject(err)
          }
        })
    })
  }

  static getComments (parameters) {
    this.validate(parameters)
    if (parameters.number === undefined) {
      throw new Error('number is required')
    }
    const token = parameters.token
    const owner = parameters.owner
    const repository = parameters.repository
    const number = parameters.number
    return new Promise((resolve, reject) => {
      SuperAgent.get(`https://api.github.com/repos/${owner}/${repository}/pulls/${number}/comments`)
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

  static getIssueComments (parameters) {
    this.validate(parameters)
    if (parameters.number === undefined) {
      throw new Error('number is required')
    }
    const token = parameters.token
    const owner = parameters.owner
    const repository = parameters.repository
    const number = parameters.number
    return new Promise((resolve, reject) => {
      SuperAgent.get(`https://api.github.com/repos/${owner}/${repository}/issues/${number}/comments`)
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

  static getCommits (parameters) {
    this.validate(parameters)
    if (parameters.number === undefined) {
      throw new Error('number is required')
    }
    const token = parameters.token
    const owner = parameters.owner
    const repository = parameters.repository
    const number = parameters.number
    return new Promise((resolve, reject) => {
      SuperAgent.get(`https://api.github.com/repos/${owner}/${repository}/pulls/${number}/commits`)
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
