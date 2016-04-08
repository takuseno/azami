export default class BaseApi {
  validate (parameters) {
    if (parameters.token === undefined) {
      throw new Error('token is required')
    }
  }
}
