export default class BaseApi {
  static validate (parameters) {
    if (parameters.token === undefined) {
      throw new Error('token is required')
    }
  }
}
